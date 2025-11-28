using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;
using StackExchange.Redis;
using Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Inject features
builder.Services.AddScoped<WordsService>();
builder.Services.AddScoped<ExamplesService>();
builder.Services.AddScoped<PartOfSpeechsService>();
builder.Services.AddScoped<MeaningsService>();
builder.Services.AddScoped<IdiomsService>();
builder.Services.AddScoped<PhrasesService>();
builder.Services.AddScoped<PostsService>();
builder.Services.AddScoped<SourceTranslatesService>();
builder.Services.AddScoped<SourcesService>();
builder.Services.AddScoped<SpeakingScoresService>();
builder.Services.AddScoped<SpeakingsService>();
builder.Services.AddScoped<SynonymsService>();
builder.Services.AddScoped<TtsService>();
builder.Services.AddScoped<WritingAnswersService>();
builder.Services.AddScoped<WritingQuestionsService>();
builder.Services.AddHttpClient<AIService>();

//Scope declare in Program not run yet, only someone calling service then it's running
builder.Services.AddScoped<JwtSettings>(sp =>
{
    var db = sp.GetRequiredService<AppDbContext>();

    string GetValue(string key)
    {
        var output = db.consts.FirstOrDefault(c => c.key == key)?.value;
        if (output == null) throw new Exception($"{key} missing");
        return output;
    }

    var Secret = GetValue("JWT_SECRET");
    var MaxAgeSeconds = GetValue("JWT_MAX_AGE");
    var HashSaltLength = GetValue("HASH_SALT_LENGTH");

    return new JwtSettings
    {
        Secret = Secret,
        MaxAgeSeconds = int.Parse(MaxAgeSeconds),
        HashSaltLength = int.Parse(HashSaltLength)
    };
});

//AuthService depend on JwtSettings and AppDbContext
builder.Services.AddScoped<AuthService>();

//System.InvalidOperationException: No authenticationScheme was specified, and there was no DefaultChallengeScheme found. The default schemes can be set using either AddAuthentication(string defaultScheme) or AddAuthentication(Action<AuthenticationOptions> configureOptions).
builder.Services.AddAuthentication("JwtScheme")
    .AddScheme<AuthenticationSchemeOptions, JwtAuthenticatedHandler>("JwtScheme", options => { });

builder.Services.AddAuthorization(); //Allow [Authorize] attribute to work

//Redis
var redisConnection = builder.Configuration.GetConnectionString("Redis")
                      ?? builder.Configuration["Redis:ConnectionString"];

if (redisConnection == null) throw new Exception("Redis connection string null!");

builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    return ConnectionMultiplexer.Connect(redisConnection!);
});

builder.Services.AddScoped<RedisService>();

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

//App init
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // URL = /swagger/index.html
    // JSON = /swagger/v1/swagger.json
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Init redist keys after build
using (var scope = app.Services.CreateScope())
{
    var redisService = scope.ServiceProvider.GetRequiredService<RedisService>();
    await redisService.InitAsync();
}

app.UseWebSockets();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<PaginationMiddleware>();

app.MapControllers();

app.Run();
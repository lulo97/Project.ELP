using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;
using StackExchange.Redis;
using Utils;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

Env.Load();

var appPort = Environment.GetEnvironmentVariable("PORT") ?? "3200";

Console.WriteLine("Running with port = " + appPort);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(int.Parse(appPort));
});

builder.Services.AddControllers();

var host = Environment.GetEnvironmentVariable("POSTGRESQL_HOST");
var port = Environment.GetEnvironmentVariable("POSTGRESQL_PORT");
var database = Environment.GetEnvironmentVariable("POSTGRESQL_DATABASE");
var user = Environment.GetEnvironmentVariable("POSTGRESQL_USER");
var password = Environment.GetEnvironmentVariable("POSTGRESQL_PASSWORD");

var connectionString = $"Host={host};Port={port};Database={database};Username={user};Password={password}";

//Console.WriteLine("PostgreSQL = " + connectionString);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

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
builder.Services.AddHttpClient<TtsService>();
builder.Services.AddScoped<WritingAnswersService>();
builder.Services.AddScoped<WritingQuestionsService>();
builder.Services.AddHttpClient<AIService>();
builder.Services.AddHttpClient<YoutubeService>();
builder.Services.AddScoped<ReadService>();

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
var redis_host = Environment.GetEnvironmentVariable("REDIS_HOST");
var redis_port = Environment.GetEnvironmentVariable("REDIS_PORT");
var redisConnection = $"{redis_host}:{redis_port}";

//Console.WriteLine("Redis = " + redisConnection);

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

// URL = /swagger/index.html
// JSON = /swagger/v1/swagger.json
app.UseSwagger();
app.UseSwaggerUI();

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
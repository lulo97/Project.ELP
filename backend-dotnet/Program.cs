using Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Inject features
builder.Services.AddScoped<WordsRepository>();
builder.Services.AddScoped<WordsService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{   
    // URL = /swagger/index.html
    // JSON = /swagger/v1/swagger.json
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

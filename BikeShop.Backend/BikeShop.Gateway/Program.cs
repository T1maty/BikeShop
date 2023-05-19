using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

// Новый конфиг файл ocelot.json для одноименного фреймворка
// Там прописаны все конфиги и роуты оцелота
builder.Configuration.AddJsonFile($"ocelot.{builder.Environment.EnvironmentName}.json", optional: false, reloadOnChange: true);

// Добавляю оцелот и сваггер для него, который подтягивает документацию из всех микросервисов
builder.Services.AddOcelot(builder.Configuration);
builder.Services.AddSwaggerForOcelot(builder.Configuration);

// Настройка CORS-политик для доступа из браузера
builder.Services.AddCors(options =>
{
    // Доступ ко всем клиентам
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});



var app = builder.Build();

// global cors policy
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials()); // allow credentials

app.MapControllers();

// Сваггер оцелота, который подтягивает всю опенапи документацию из микросервисов, роут на корень 
app.UseSwaggerForOcelotUI(opt =>
{
    opt.PathToSwaggerGenerator = "/swagger/docs";
}, config => { config.RoutePrefix = string.Empty; });

app.UseWebSockets();
app.UseOcelot().Wait();

app.Run();
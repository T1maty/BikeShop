using BikeShop.Workspace.Application;

var builder = WebApplication.CreateBuilder(args);

// Инъекция сервисов из слоя Application
builder.Services.AddApplication();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
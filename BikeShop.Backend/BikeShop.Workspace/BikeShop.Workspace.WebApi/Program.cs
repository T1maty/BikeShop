using BikeShop.Workspace.Application;
using BikeShop.Workspace.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Инъекция сервисов из слоя Application и Persistence
builder.Services.AddApplication();
builder.Services.AddPersistence();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
using System.Reflection;
using BikeShop.Workspace.Application;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Инъекция сервисов из слоя Application и Persistence
builder.Services.AddApplication();
builder.Services.AddPersistence();

// Инжект конфигурации автомаппера
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
    config.AddProfile(new AssemblyMappingProfile(typeof(IApplicationDbContext).Assembly));
});

// Инициализация базы, если её нет
try
{
    var scope = builder.Services.BuildServiceProvider().CreateScope();
    var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    // temporary
    Console.WriteLine(ex);
}


var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
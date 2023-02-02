using System.Reflection;
using BikeShop.Service.Application;
using BikeShop.Service.Application.Common.Configurations;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Persistence;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Привязка класса ConnectionConfiguration к разделу ConnectionString в appsettings
builder.Services.Configure<ConnectionConfiguration>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<ConnectionConfiguration>>().Value);

// Подключение внутренних слоев приложения
builder.Services.AddApplication().AddPersistence();

builder.Services.AddControllers();

// Регистрация конфигурации автомаппера
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
    config.AddProfile(new AssemblyMappingProfile(typeof(AssemblyMappingProfile).Assembly));
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

app.MapControllers();

app.Run();
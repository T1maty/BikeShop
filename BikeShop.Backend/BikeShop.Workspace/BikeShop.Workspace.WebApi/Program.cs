using System.Reflection;
using System.Text.Json;
using BikeShop.Workspace.Application;
using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Persistence;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Подключение скрытого json файла со строкой подключения к постгрес серверу
builder.Configuration.AddJsonFile("connectionStrings.json");

// Инжект кастомных классов конфигураций. Должен стоять до инжектов слоев Application и Persistence

// Привязка класса ConnectionConfiguration к разделу ConnectionString в appsettings
builder.Services.Configure<ConnectionConfiguration>(builder.Configuration.GetSection("ConnectionStrings"));

builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<ConnectionConfiguration>>().Value);

// Привязка класса DefaultValuesConfiguration к разделу DefaultValues в appsettings
builder.Services.Configure<DefaultValuesConfiguration>(builder.Configuration.GetSection("DefaultValues"));
builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<DefaultValuesConfiguration>>().Value);


// Подключение контроллеров, так же настройка именования JSON данных
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Чтобы выходные JSON-ключи были с маленькой буквы
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
    });


// Инъекция сервисов из слоя Application и Persistence
builder.Services.AddApplication();
builder.Services.AddPersistence();

// CORS
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
    var defaultConfiguration = scope.ServiceProvider.GetService<DefaultValuesConfiguration>();

    DbInitializer.Initialize(context, defaultConfiguration);
}
catch (Exception ex)
{
    // temporary
    Console.WriteLine(ex);
}


var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.MapControllers();

app.Run();
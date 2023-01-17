using System.Reflection;
using BikeShop.Workspace.Application;
using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Persistence;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Инжект кастомных классов конфигураций. Должен стоять до инжектов слоев Application и Persistence

// Привязка класса ConnectionConfiguration к разделу ConnectionString в appsettings
builder.Services.Configure<ConnectionConfiguration>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<ConnectionConfiguration>>().Value);


builder.Services.AddControllers();

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
    DbInitializer.Initialize(context);
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
using System.Reflection;
using System.Text.Json;
using BikeShop.Service.Application;
using BikeShop.Service.Application.Common.Configurations;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Application.RefitClients;
using BikeShop.Service.Persistence;
using BikeShop.Service.WebApi.Middleware;
using Microsoft.Extensions.Options;
using Refit;

var builder = WebApplication.CreateBuilder(args);

// Привязка класса ConnectionConfiguration к разделу ConnectionString в appsettings
builder.Services.Configure<ConnectionConfiguration>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<ConnectionConfiguration>>().Value);

// Подключение внутренних слоев приложения
builder.Services.AddApplication().AddPersistence();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Чтобы выходные JSON-ключи были с маленькой буквы
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
});
;

// Register refit
builder.Services.AddRefitClient<IIdentityClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:Identity"]));

builder.Services.AddRefitClient<IProductsClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:Products"]));

builder.Services.AddRefitClient<IShopClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:Shop"]));


// Регистрация конфигурации автомаппера
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
    config.AddProfile(new AssemblyMappingProfile(typeof(AssemblyMappingProfile).Assembly));
});

// Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(config =>
{
    // Включаю хml комментарии и путь к ним
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);
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

app.UseCustomExceptionHandler();

app.UseSwagger();
app.UseSwaggerUI(config =>
{
    // get to swagger UI using root uri
    config.RoutePrefix = string.Empty;

    config.SwaggerEndpoint("swagger/v1/swagger.json", "BikeShop.Service API");
});

app.MapControllers();

app.Run();
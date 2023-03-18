using System.Net.Mime;
using System.Reflection;
using System.Text.Json;
using BikeShop.Products.Application;
using BikeShop.Products.Application.Common.Configurations;
using BikeShop.Products.Application.Common.Mappings;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Application.RefitClients;
using BikeShop.Products.Persistence;
using BikeShop.Products.WebApi.Middleware;
using BikeShop.Products.WebApi.Models.Validation;
using Microsoft.Extensions.Options;
using Refit;

var builder = WebApplication.CreateBuilder(args);

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
        
    }).ConfigureApiBehaviorOptions(options =>
    {
        // кастомная модель валидации
        options.InvalidModelStateResponseFactory = context =>
        {
            var result = new ValidationFailedResult(context.ModelState);
            result.ContentTypes.Add(MediaTypeNames.Application.Json);

            return result;
        };
    });

builder.Services.AddRefitClient<IFileServiceClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:FileService"]));

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

// Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(config =>
{
    // Включаю хml комментарии и путь к ним
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);
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

app.UseCors("AllowAll");

app.UseCustomExceptionHandler();
app.UseSwagger();
app.UseSwaggerUI(config =>
{
    // get to swagger UI using root uri
    config.RoutePrefix = string.Empty;

    config.SwaggerEndpoint("swagger/v1/swagger.json", "BikeShop.Products API");
});

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
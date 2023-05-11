using System.Net.Mime;
using System.Reflection;
using System.Text;
using System.Text.Json;
using BikeShop.Products.Application;
using BikeShop.Products.Application.Common.Configurations;
using BikeShop.Products.Application.Common.Mappings;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Application.RefitClients;
using BikeShop.Products.Persistence;
using BikeShop.Products.WebApi.Middleware;
using BikeShop.Products.WebApi.Models.Validation;
using BikeShop.Service.Application.RefitClients;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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

builder.Services.AddRefitClient<IShopClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:Shop"]));

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

// Добавлении схемы аутентификации по JWT токену
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(config =>
{
    // Включаю хml комментарии и путь к ним
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);

    // Добавление возможности указывать JWT access token в сваггере для эндпоинтов, которые требуют bearer
    config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    // Сваггер будет добавлять указанный JWT access token в заголовки
    config.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                }
            },
            new string[] {}
        }
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

app.UseCors("AllowAll");

app.UseCustomExceptionHandler();
app.UseSwagger();
app.UseSwaggerUI(config =>
{
    // get to swagger UI using root uri
    config.RoutePrefix = string.Empty;

    config.SwaggerEndpoint("swagger/v1/swagger.json", "BikeShop.Products API");
});

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.WebApi.Controllers;
using BikeShop.Products.Application;
using BikeShop.Products.Application.Common.Configurations;
using BikeShop.Products.Persistence;
using BikeShop.Products.WebApi.Middleware;
using BikeShop.Products.WebApi.Models.Validation;
using BikeShop.Service.Application.RefitClients;
using Microsoft.Extensions.Options;
using Refit;
using System.Net.Mime;
using System.Reflection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// ������ ��������� ������� ������������. ������ ������ �� �������� ����� Application � Persistence

// �������� ������ ConnectionConfiguration � ������� ConnectionString � appsettings
builder.Services.Configure<ConnectionConfiguration>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<ConnectionConfiguration>>().Value);

// �������� ������ DefaultValuesConfiguration � ������� DefaultValues � appsettings
builder.Services.Configure<DefaultValuesConfiguration>(builder.Configuration.GetSection("DefaultValues"));
builder.Services.AddSingleton(resolver =>
    resolver.GetRequiredService<IOptions<DefaultValuesConfiguration>>().Value);

builder.Services.AddRefitClient<IFileserviceClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:FileService"]));
builder.Services.AddRefitClient<IProductClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:Products"]));
builder.Services.AddRefitClient<IShopClient>()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri(builder.Configuration["ApiAddresses:Shop"]));


builder.Services.AddSignalR(); 

// ����������� ������������, ��� �� ��������� ���������� JSON ������
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // ����� �������� JSON-����� ���� � ��������� �����
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;

    }).ConfigureApiBehaviorOptions(options =>
    {

        // ��������� ������ ���������
        options.InvalidModelStateResponseFactory = context =>
        {
            var result = new ValidationFailedResult(context.ModelState);
            result.ContentTypes.Add(MediaTypeNames.Application.Json);

            return result;
        };

    });

// �������� �������� �� ���� Application � Persistence
builder.Services.AddApplication();
builder.Services.AddPersistence();

// CORS
builder.Services.AddCors(options =>
{
    // ������ �� ���� ��������
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(config =>
{
    // ������� �ml ����������� � ���� � ���
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    config.IncludeXmlComments(xmlPath);
});


// ������������� ����, ���� � ���
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
app.MapHub<PrintQueueHub>("/printhub");

app.Run();
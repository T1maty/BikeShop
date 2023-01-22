using System.Reflection;
using BikeShop.Identity.Application;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.Persistence;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddPersistence();

builder.Services.AddControllers();

builder.Services.AddIdentity<BikeShopUser, IdentityRole>(config =>
    {
        config.Password.RequiredLength = 4;
        config.Password.RequireDigit = false;
        config.Password.RequireUppercase = false;
        config.Password.RequireNonAlphanumeric = false;
    })
    .AddRoles<IdentityRole>()
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddRoleManager<RoleManager<IdentityRole>>();

builder.Services.AddIdentityServer()
    .AddAspNetIdentity<BikeShopUser>()
    .AddInMemoryClients(IdentityConfiguration.Clients)
    .AddInMemoryApiScopes(IdentityConfiguration.ApiScopes)
    .AddInMemoryApiResources(IdentityConfiguration.ApiResources)
    .AddInMemoryIdentityResources(IdentityConfiguration.IdentityResources)
    .AddDeveloperSigningCredential();

// builder.Services.ConfigureApplicationCookie(config =>
// {
//     config.Cookie.Name = "Notes.Identity.Cookie";
//     config.LoginPath = "/Auth/SignIn";
//     config.LogoutPath = "/Auth/Logout";
// });


// Инжект конфигурации автомаппера
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
    config.AddProfile(new AssemblyMappingProfile(typeof(AssemblyMappingProfile).Assembly));
});

// Инициализация базы, если её нет
try
{
    var scope = builder.Services.BuildServiceProvider().CreateScope();
    var context = scope.ServiceProvider.GetService<AuthDbContext>();

    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    // temporary
    Console.WriteLine(ex);
}

var app = builder.Build();

// Для маршрутизации эндпоинтов ООС и openId connect
app.UseIdentityServer();

app.MapControllers();

app.Run();
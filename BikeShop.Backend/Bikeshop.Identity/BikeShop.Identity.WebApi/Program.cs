using BikeShop.Identity.Application;
using BikeShop.Identity.Domain;
using BikeShop.Identity.Persistence;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistence();

builder.Services.AddControllers();

builder.Services.AddIdentity<BikeShopUser, IdentityRole>(config =>
    {
        config.Password.RequiredLength = 4;
        config.Password.RequireDigit = false;
        config.Password.RequireNonAlphanumeric = false;
        config.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddIdentityServer()
    .AddAspNetIdentity<BikeShopUser>()
    .AddInMemoryApiResources(IdentityConfiguration.ApiResources)
    .AddInMemoryIdentityResources(IdentityConfiguration.IdentityResources)
    .AddInMemoryApiScopes(IdentityConfiguration.ApiScopes)
    .AddInMemoryClients(IdentityConfiguration.Clients)
    .AddDeveloperSigningCredential();


builder.Services.ConfigureApplicationCookie(config =>
{
    config.Cookie.Name = "Notes.Identity.Cookie";
    config.LoginPath = "/Auth/Login";
    config.LogoutPath = "/Auth/Logout";
});

var app = builder.Build();

// Для маршрутизации эндпоинтов ООС и openId connect
app.UseIdentityServer();
app.MapControllers();

app.MapGet("/", () => "Hello World!");

app.Run();
using System.Reflection;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Identity.Application;

// Регистрация зависимостей из слоя Application
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Регистрация кастомных сервисов
        services.AddScoped<CookieService>();
        services.AddScoped<JwtService>();


        services.AddScoped<IUserService,UserService>();
        services.AddScoped<IRoleService,RoleService>();
        services.AddScoped<IUserBalanceService,UserBalanceService>();
        services.AddScoped<IAuthService,AuthService>();

        return services;
    }
}
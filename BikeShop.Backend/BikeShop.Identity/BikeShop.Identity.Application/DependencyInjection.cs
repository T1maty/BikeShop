using System.Reflection;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Identity.Application;

// Регистрация зависимостей из слоя Application
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Инжект библиотеки mediatr для CQRS
        services.AddMediatR(Assembly.GetExecutingAssembly());

        // Регистрация кастомных сервисов
        services.AddScoped<CookieService>();
        services.AddScoped<JwtService>();


        services.AddScoped<IUserService,UserService>();
        services.AddScoped<IRoleService,RoleService>();

        return services;
    }
}
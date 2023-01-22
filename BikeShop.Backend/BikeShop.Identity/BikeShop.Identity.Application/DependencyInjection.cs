using System.Reflection;
using BikeShop.Identity.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Identity.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Инжект библиотеки mediatr для CQRS
        services.AddMediatR(Assembly.GetExecutingAssembly());

        services.AddScoped<TokenService>();

        return services;
    }
}
using System.Reflection;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Service.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Инжект библиотеки mediatr для CQRS
        services.AddMediatR(Assembly.GetExecutingAssembly());

        services.AddScoped<IServiceService, ServiceService>();


        return services;
    }
}
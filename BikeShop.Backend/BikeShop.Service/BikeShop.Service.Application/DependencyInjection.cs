using System.Reflection;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Service.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IServiceService, ServiceService>();
        services.AddScoped<IWorkService, WorkService>();
        services.AddScoped<IWorkGroupService, WorkGroupService>();

        return services;
    }
}
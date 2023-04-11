using System.Reflection;
using BikeShop.Shop.Application.Implemetations;
using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Shop.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());
        
        services.AddScoped<IGetAllServices, GetAllService>();
        services.AddScoped<IShiftService, ShiftService>();
        
        return services;
    }
}
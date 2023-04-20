
using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Products.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ISupplyInvoiceService, SupplyInvoiceService>();
        services.AddScoped<IEncashmentService, EncashmentService>();


        return services;
    }
}
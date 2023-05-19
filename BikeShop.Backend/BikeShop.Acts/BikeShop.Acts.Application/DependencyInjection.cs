
using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Services;
using BikeShop.Acts.WebApi.Controllers;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Products.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ISupplyInvoiceService, SupplyInvoiceService>();
        services.AddScoped<IEncashmentService, EncashmentService>();
        services.AddScoped<ICashboxActionService, CashboxActionService>();
        services.AddScoped<IInventarizationService, InventarizationService>();
        services.AddScoped<IPayoutService, PayoutService>();
        services.AddScoped<IProductMoveService, ProductMoveService>();
        services.AddScoped<IPrintService, PrintService>();
        services.AddScoped<PrintQueueHub>();


        return services;
    }
}
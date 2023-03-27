﻿using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Products.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICurrencyService, CurrencyService>();

        return services;
    }
}
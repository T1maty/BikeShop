﻿using System.Reflection;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Products.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Инжект библиотеки mediatr для CQRS
        services.AddMediatR(Assembly.GetExecutingAssembly());

        // Инжект сервисов
        services.AddScoped<IProductService, ProductService>();
        
        return services;
    }
}
﻿using BikeShop.Workspace.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Workspace.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        // inject db context
        
        // todo json config load
        string connectionString =
            "Host=localhost;Port=5432;Database=usersdb;Username=postgres;Password=54321";

        services.AddDbContext<ApplicationDbContext>(options => { options.UseNpgsql(connectionString); });

        // Инжектнул ранее созданный сервис дб контекста
        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetService<ApplicationDbContext>());

        return services;
    }
}
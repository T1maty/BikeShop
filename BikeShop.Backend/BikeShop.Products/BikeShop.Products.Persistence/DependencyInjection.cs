using System.Reflection;
using BikeShop.Products.Application.Common.Configurations;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Products.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        // Получаю сущность ConnectionConfiguration из сервисов
        var scope = services.BuildServiceProvider().CreateScope();
        var connectionConfiguration = scope.ServiceProvider.GetService<ConnectionConfiguration>();
       
        // Инжект DbContext-а
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            // options.UseNpgsql(connectionConfiguration.Postgres, options =>
            // {
            //     options.SetPostgresVersion(new Version("9.6"));
            // });

            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                //options.UseSqlite(connectionConfiguration.Sqlite);
                options.UseMySql(connectionConfiguration.MySql, new MySqlServerVersion(connectionConfiguration.MySqlVersion));
            }
            else
            {
                options.UseMySql(connectionConfiguration.MySql, new MySqlServerVersion(connectionConfiguration.MySqlVersion));
            }

        });

        // Связал интерфейс контекста с ранее созданным сервисом на классе 
        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetService<ApplicationDbContext>());

        return services;
    }
}
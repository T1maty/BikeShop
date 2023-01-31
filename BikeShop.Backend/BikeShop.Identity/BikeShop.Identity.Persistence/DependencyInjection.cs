using BikeShop.Identity.Application.Common.Configurations;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Identity.Persistence;

// Регистрация зависимостей слоя Persistence
public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        // Подтягиваю конфигурацию со строками соединений
        var scope = services.BuildServiceProvider().CreateScope();
        var connectionConfiguration = scope.ServiceProvider.GetService<ConnectionConfiguration>();

        // Регистрирую AuthDbContext
        services.AddDbContext<AuthDbContext>(options =>
        {
            options.UseSqlite(connectionConfiguration.Sqlite);
            // options.UseNpgsql(connectionConfiguration.Postgres, 
            //     options =>
            //     {
            //         options.SetPostgresVersion(new Version("9.6"));
            //         options.MigrationsAssembly("BikeShop.Identity.WebApi");
            //     });
        });

        // Связал интерфейс контекста с ранее созданным сервисом на классе 
        services.AddScoped<IAuthDbContext>(provider =>
            provider.GetService<AuthDbContext>());

        return services;
    }
}
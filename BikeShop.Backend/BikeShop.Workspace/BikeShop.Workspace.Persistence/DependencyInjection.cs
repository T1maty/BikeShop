using System.Reflection;
using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Workspace.Persistence;

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
            
            options.UseSqlite(connectionConfiguration.Sqlite);

        });

        // Связал интерфейс контекста с ранее созданным сервисом на классе 
        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetService<ApplicationDbContext>());

        return services;
    }
}
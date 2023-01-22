using BikeShop.Identity.Persistence.CustomStores;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Identity.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        services.AddDbContext<AuthDbContext>(options => { options.UseSqlite("Data source=identity.db"); });

      

        return services;
    }
}
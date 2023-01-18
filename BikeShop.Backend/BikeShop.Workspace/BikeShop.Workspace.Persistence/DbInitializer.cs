using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Domain.Entities;

namespace BikeShop.Workspace.Persistence;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context, DefaultValuesConfiguration configuration)
    {
        // Создает базу, если её не существует
        context.Database.EnsureCreated();

        // Создание стандартного магазина
        if (!context.Shops.Any())
            context.Shops.Add(new Shop { Name = configuration.DefaultShopName });
        
        // Создание стандартной валюты
        if (!context.Currencies.Any())
            context.Currencies.Add(new Currency
            {
                Name = configuration.DefaultCurrency,
                Coefficient = 1,
                IsBaseCurrency = true
            });

        // Создание стандартных ролей
        if (!context.UserRoles.Any())
        {
            context.UserRoles.Add(new UserRole { Name = configuration.DefaultUserRole });
            context.UserRoles.Add(new UserRole { Name = configuration.DefaultAdminRole });
        }
        
        context.SaveChanges();
    }
}
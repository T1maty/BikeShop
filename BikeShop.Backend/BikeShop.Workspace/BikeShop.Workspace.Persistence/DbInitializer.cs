using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Persistence;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context, DefaultValuesConfiguration configuration)
    {
        // Создает базу, если её не существует
        context.Database.EnsureCreated();
        context.Database.Migrate();

        // Создание стандартного магазина
        if (!context.Shops.Any())
            context.Shops.Add(new Shop
            {
                Name = configuration.DefaultShopName
            });

        // Создание стандартной валюты
        if (!context.Currencies.Any())
            context.Currencies.Add(new Currency
            {
                Name = configuration.DefaultCurrency,
                Coefficient = 1,
                IsBaseCurrency = true,
                Symbol = '$'
            });

        if (!context.Brands.Any())
            context.Brands.Add(new Brand
            {
                Id = 1,
                Name = "Default brand",
                SortOrder = 0,
                ImageSource =
                    "https://api.delfi.ee/media-api-image-cropper/v1/07f235c0-7579-11ed-9cac-31655ba2167a.jpg?noup&w=1200&h=711"
            });

        if (!context.ProductTags.Any())
            context.ProductTags.AddRange(
                new ProductTag()
                {
                    Id = 1,
                    Name = "test1"
                },
                new ProductTag()
                {
                    Id = 2,
                    Name = "test2"
                }
            );


        // // Создание стандартных ролей
        // if (!context.UserRoles.Any())
        // {
        //     context.UserRoles.Add(new UserRole { Name = configuration.DefaultUserRole });
        //     context.UserRoles.Add(new UserRole { Name = configuration.DefaultAdminRole });
        // }

        context.SaveChanges();
    }
}
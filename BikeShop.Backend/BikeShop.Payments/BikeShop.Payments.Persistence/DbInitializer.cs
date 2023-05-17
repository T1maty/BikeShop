using BikeShop.Products.Application.Common.Configurations;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context, DefaultValuesConfiguration configuration)
    {
        // Создает базу, если её не существует
       // context.Database.EnsureCreated();
        //context.Database.Migrate();

        //context.SaveChanges();
    }
}
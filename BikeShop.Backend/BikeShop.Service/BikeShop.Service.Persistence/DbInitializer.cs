using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Persistence;

public class DbInitializer
{
    public static void Initialize(DbContext context)
    {
        //context.Database.EnsureCreated();
    }
}
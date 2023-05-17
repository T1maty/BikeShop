using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Persistence;

// Инициализатор базы данных, если её нету
public class DbInitializer
{
    public static void Initialize(AuthDbContext context)
    {
        //context.Database.EnsureCreated();
        //context.Database.Migrate();
    }
}
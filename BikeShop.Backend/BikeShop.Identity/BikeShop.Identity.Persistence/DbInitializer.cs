using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Persistence;

public class DbInitializer
{
    public static void Initialize(AuthDbContext context)
    {
        context.Database.EnsureCreated();
    }
}
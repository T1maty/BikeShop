using Microsoft.EntityFrameworkCore;

namespace Bikeshop.Shop.Persistence;

public class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        //context.Database.EnsureCreated();
        //context.Database.Migrate();
    }
}
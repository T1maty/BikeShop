using BikeShop.Workspace.Domain.Entities;

namespace BikeShop.Workspace.Persistence;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();
    }
}
using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Domain.Entities;

namespace BikeShop.Workspace.Persistence;

public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        // Создает базу, если её не существует
        context.Database.EnsureCreated();

        // // Создает роли по умолчанию, если их нет
        // if (!context.UserRoles.Any())
        // {
        //     context.UserRoles.Add(new UserRole()
        //     {

        //     })
        // }
    }
}
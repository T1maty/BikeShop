using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BikeShop.Workspace.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    // DbSet<User> Users { get; set; }
    // DbSet<UserRole> UserRoles { get; set; }
    DbSet<Shop> Shops { get; set; }
    DbSet<Currency> Currencies { get; set; }
    DbSet<CurrencyHistory> CurrencyHistories { get; set; }
    DbSet<WorkGroup> WorkGroups { get; set; }
    DbSet<Work> Works { get; set; }
    DbSet<Product> Products { get; set; }
    DbSet<ProductTag> ProductTags { get; set; }
    DbSet<Brand> Brands { get; set; }
    DbSet<TagToProductBind> TagToProductBinds { get; set; }


    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
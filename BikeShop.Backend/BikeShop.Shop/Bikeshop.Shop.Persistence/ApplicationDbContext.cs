using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bikeshop.Shop.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<BikeShop.Shop.Domain.Entities.Shop> Shops { get; set; }
    public DbSet<ShopScheduleItem> ShopScheduleItems { get; set; }
    public DbSet<UserShiftItem> UserShiftItems { get; set; }
    public DbSet<CashboxHistory> CashboxHistories { get; set; }
    public DbSet<UserSalary> UserSalaries { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BikeShop.Shop.Domain.Entities.Shop>()
            .HasIndex(i => i.StorageId).IsUnique();
    }
}
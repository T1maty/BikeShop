using BikeShop.Shop.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Bikeshop.Shop.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<BikeShop.Shop.Domain.Entities.Shop> Shops { get; set; }

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
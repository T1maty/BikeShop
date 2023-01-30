using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    // public DbSet<User> Users { get; set; }
    // public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Shop> Shops { get; set; }
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<CurrencyHistory> CurrencyHistories { get; set; }
    public DbSet<WorkGroup> WorkGroups { get; set; }
    public DbSet<Work> Works { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductTag> ProductTags { get; set; }
    public DbSet<TagToProductBind> TagToProductBinds { get; set; }
    public DbSet<Brand> Brands { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        // Позволяет не конвертировать время в UTC для postgresql
        // AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        // AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TagToProductBind>().HasKey(bind => new { bind.ProductId, bind.ProductTagId });

        modelBuilder.Entity<TagToProductBind>()
            .HasOne<Product>(sc => sc.Product)
            .WithMany(s => s.TagToProductBinds)
            .HasForeignKey(sc => sc.ProductId);
        
        modelBuilder.Entity<TagToProductBind>()
            .HasOne<ProductTag>(sc => sc.ProductTag)
            .WithMany(s => s.TagToProductBinds)
            .HasForeignKey(sc => sc.ProductTagId);
    }
}
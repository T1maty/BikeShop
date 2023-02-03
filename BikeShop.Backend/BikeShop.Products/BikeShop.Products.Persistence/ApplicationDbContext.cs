using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
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
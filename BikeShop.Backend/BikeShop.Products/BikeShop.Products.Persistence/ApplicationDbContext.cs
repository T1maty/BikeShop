using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductTag> ProductTags { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<TagToProductBind> TagToProductBinds { get; set; }
    public DbSet<ProductBind> ProductBinds { get; set; }
    public DbSet<ProductImg> ProductImgs { get; set; }
    public DbSet<ProductCard> ProductsCards { get; set; }
    public DbSet<StorageProduct> StorageProducts { get; set; }
    public DbSet<Storage> Storages { get; set; }
    public DbSet<ProductStorageMove> ProductStorageMoves { get; set; }
    public DbSet<ProductStoragesTtansition> ProductStoragesTtansitions { get; set; }
    public DbSet<ProductReservation> ProductReservations { get; set; }
    public DbSet<ProductSerialNumber> ProductSerialNumbers { get; set; }
    public DbSet<QuantityUnit> QuantityUnits { get; set; }
    public DbSet<QuantityUnitGroup> QuantityUnitGroups { get; set; }
    public DbSet<PriceHistory> PriceHistories { get; set; }

    public DbSet<ProductSpecification> ProductSpecifications { get; set; }
    public DbSet<Specification> Specifications { get; set; }

    public DbSet<Option> Options { get; set; }
    public DbSet<OptionVariant> OptionVariants { get; set; }
    public DbSet<ProductOptionVariantBind> ProductOptionVariantBinds { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        // Позволяет не конвертировать время в UTC для postgresql
        // AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        // AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //modelBuilder.Entity<TagToProductBind>().HasKey(bind => new { bind.ProductId, bind.ProductTagId });

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
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BikeShop.Products.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    DbSet<Product> Products { get; set; }
    DbSet<Brand> Brands { get; set; }
    DbSet<ProductBind> ProductBinds { get; set; }
    DbSet<ProductImg> ProductImgs { get; set; }
    DbSet<ProductCard> ProductsCards { get; set; }
    DbSet<StorageProduct> StorageProducts { get; set; }
    DbSet<Storage> Storages { get; set; }
    DbSet<ProductStorageMove> ProductStorageMoves { get; set; }
    DbSet<ProductStoragesTtansition> ProductStoragesTtansitions { get; set; }
    DbSet<ProductReservation> ProductReservations { get; set; }
    DbSet<ProductSerialNumber> ProductSerialNumbers { get; set; }
    DbSet<QuantityUnit> QuantityUnits { get; set; }
    DbSet<QuantityUnitGroup> QuantityUnitGroups { get; set; }
    DbSet<PriceHistory> PriceHistories { get; set; }


    DbSet<Option> Options { get; set; }
    DbSet<OptionVariant> OptionVariants { get; set; }
    DbSet<ProductOptionVariantBind> ProductOptionVariantBinds { get; set; }

    DbSet<TagToCategoryBind> TagToCategoryBinds { get; set; }
     DbSet<ProductCategory> ProductCategories { get; set; }
     DbSet<ClientFavProduct> ClientFavProducts { get; set; }


    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
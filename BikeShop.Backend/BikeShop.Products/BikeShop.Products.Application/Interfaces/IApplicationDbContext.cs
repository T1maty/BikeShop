using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BikeShop.Products.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    DbSet<Product> Products { get; set; }
    DbSet<ProductTag> ProductTags { get; set; }
    DbSet<Brand> Brands { get; set; }
    DbSet<TagToProductBind> TagToProductBinds { get; set; }
    DbSet<ProductBind> ProductBinds { get; set; }
    DbSet<ProductImg> productImgs { get; set; }
    DbSet<ProductCard> productsCards { get; set; }
    DbSet<StorageProduct> storageProducts { get; set; }
    DbSet<Storage> Storages { get; set; }
    DbSet<ProductStorageMove> productStorageMoves { get; set; }

    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
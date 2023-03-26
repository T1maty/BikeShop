using BikeShop.Payments.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BikeShop.Products.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<CurrencyHistory> CurrencyHistories { get; set; }

    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
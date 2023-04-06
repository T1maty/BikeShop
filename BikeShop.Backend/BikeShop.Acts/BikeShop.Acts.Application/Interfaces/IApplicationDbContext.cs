

using BikeShop.Acts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    public DbSet<SupplyInvoice> SupplyInvoices { get; set; }
    public DbSet<SupplyInvoiceProduct> SupplyInvoiceProducts { get; set; }

    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
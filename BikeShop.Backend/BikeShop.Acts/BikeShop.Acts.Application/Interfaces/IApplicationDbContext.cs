

using BikeShop.Acts.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.Interfaces;

// Интерфейс для единственного dbContext'а программы
public interface IApplicationDbContext
{
    public DbSet<SupplyInvoice> SupplyInvoices { get; set; }
    public DbSet<SupplyInvoiceProduct> SupplyInvoiceProducts { get; set; }
    public DbSet<Encashment> Encashments { get; set; }
    public DbSet<CashboxAction> CashboxActions { get; set; }
    public DbSet<Inventarization> Inventarizations { get; set; }
    public DbSet<InventarizationLack> InventarizationLacks { get; set; }
    public DbSet<InventarizationProduct> InventarizationProducts { get; set; }
    public DbSet<InventarizationLackProduct> InventarizationLackProducts { get; set; }
    public DbSet<Payout> Payouts { get; set; }
    public DbSet<ProductMove> ProductMoves { get; set; }
    public DbSet<ProductMoveProduct> ProductMoveProducts { get; set; }
    public DbSet<ActImage> ActImages { get; set; }
    public DbSet<PrintQueue> PrintQueues { get; set; }



    // Стандартные методы из DbContext, чтобы можно их было вызывать через интерфейс
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

using BikeShop.Acts.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    
    public DbSet<SupplyInvoice> SupplyInvoices { get; set; }
    public DbSet<SupplyInvoiceProduct> SupplyInvoiceProducts { get; set; }
    public DbSet<Encashment> Encashments { get; set; }
    public DbSet<CashboxAction> CashboxActions { get; set; }
    public DbSet<Inventarization> Inventarizations { get; set; }
    public DbSet<InventarizationLack> InventarizationLacks { get; set; }
    public DbSet<InventarizationProduct> InventarizationProducts { get; set; }
    public DbSet<InventarizationLackProduct> InventarizationLackProducts { get; set; }
    public DbSet<ProductMove> ProductMoves { get; set; }
    public DbSet<ProductMoveProduct> ProductMoveProducts { get; set; }
    public DbSet<Payout> Payouts { get; set; }
    public DbSet<ActImage> ActImages { get; set; }
    public DbSet<PrintQueue> PrintQueues { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
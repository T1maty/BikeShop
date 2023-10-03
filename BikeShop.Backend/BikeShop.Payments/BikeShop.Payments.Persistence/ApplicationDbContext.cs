using BikeShop.Payments.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<CurrencyHistory> CurrencyHistories { get; set; }
    public DbSet<Discount> Discounts { get; set; }
    public DbSet<DiscountProductBind> DiscountProductBinds { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<BillProduct> BillProducts { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }

    public DbSet<CheckboxSettings> CheckboxSettings { get; set; }
    public DbSet<OrderStatusHistory> OrderStatusHistories { get; set; }


    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        //modelBuilder.Entity<Bill>().Property(n=>n.UUID).ValueGeneratedOnAdd().HasDefaultValueSql("UUID()"); ;
    }
}
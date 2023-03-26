using BikeShop.Payments.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<CurrencyHistory> CurrencyHistories { get; set; }


    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }


}
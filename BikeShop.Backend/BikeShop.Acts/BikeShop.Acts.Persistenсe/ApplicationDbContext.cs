
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    
    //public DbSet<Currency> Currencies { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Shop> Shops { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        // Позволяет не конвертировать время в UTC для postgresql
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // todo apply configuration ...
    }
}
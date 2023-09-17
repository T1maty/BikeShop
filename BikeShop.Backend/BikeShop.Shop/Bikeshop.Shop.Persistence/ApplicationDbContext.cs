using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Xml;

namespace Bikeshop.Shop.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<BikeShop.Shop.Domain.Entities.Shop> Shops { get; set; }
    public DbSet<ShopScheduleItem> ShopScheduleItems { get; set; }
    public DbSet<UserShiftItem> UserShiftItems { get; set; }
    public DbSet<CashboxHistory> CashboxHistories { get; set; }
    public DbSet<UserSalary> UserSalaries { get; set; }
    public DbSet<ScheduleHistory> ScheduleHistories { get; set; }
    public DbSet<ScheduleItem> ScheduleItems { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BikeShop.Shop.Domain.Entities.Shop>()
            .HasIndex(i => i.StorageId).IsUnique();

        var dateTimeConverter = new DateTimeKindConverter();

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}


public class DateTimeKindConverter : ValueConverter<DateTime, DateTime>
{
    public DateTimeKindConverter() : base(
        v => v,
        v => DateTime.SpecifyKind(v, DateTimeKind.Local))
    {
    }
}
using BikeShop.Shop.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Shop.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Domain.Entities.Shop> Shops { get; set; }
    public DbSet<ShopScheduleItem> ShopScheduleItems { get; set; }
    public DbSet<UserShiftItem> UserShiftItems { get; set; }
    public DbSet<CashboxHistory> CashboxHistories { get; set; }
    public DbSet<UserSalary> UserSalaries { get; set; }



    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
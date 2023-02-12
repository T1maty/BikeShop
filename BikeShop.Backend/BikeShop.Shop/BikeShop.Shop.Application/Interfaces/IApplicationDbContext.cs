using Microsoft.EntityFrameworkCore;

namespace BikeShop.Shop.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Domain.Entities.Shop> Shops { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
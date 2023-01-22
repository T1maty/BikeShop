using BikeShop.Identity.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.Interfaces;

public interface IAuthDbContext
{
    public DbSet<RefreshSession> RefreshSessions { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
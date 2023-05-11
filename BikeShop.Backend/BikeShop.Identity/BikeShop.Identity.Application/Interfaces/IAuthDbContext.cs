using BikeShop.Identity.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.Interfaces;

// Интерфейс главного db-контекста программы
public interface IAuthDbContext
{
    DbSet<RefreshSession> RefreshSessions { get; set; }
    public DbSet<RoleGroup> RoleGroups { get; set; }
    public DbSet<RoleGroupBind> RoleGroupBinds { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
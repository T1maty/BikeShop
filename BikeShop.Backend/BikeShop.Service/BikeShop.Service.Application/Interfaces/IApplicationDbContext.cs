using Microsoft.EntityFrameworkCore;
using BikeShop.Service.Domain.Entities;

namespace BikeShop.Service.Application.Interfaces;

// Главный dbContext микросервиса
public interface IApplicationDbContext
{
    DbSet<Domain.Entities.Service> Services { get; set; }
    DbSet<ServiceProduct> ServiceProducts { get; set; }
    DbSet<ServiceWork> ServiceWorks { get; set; }
    DbSet<Work> Works { get; set; }
    DbSet<WorkGroup> WorkGroups { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
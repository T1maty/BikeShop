namespace BikeShop.Identity.Application.Interfaces;

public interface IAuthDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BikeShop.Identity.Application.Interfaces;

public interface ICustomUserStore
{
    Task<BikeShopUser?> FindByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken);
}
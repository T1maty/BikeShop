using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Persistence.CustomStores;

public class CustomUserStore : UserStore<BikeShopUser>, ICustomUserStore
{
    public CustomUserStore(DbContext context, IdentityErrorDescriber? describer = null) : base(context, describer)
    {
    }

    public Task<BikeShopUser?> FindByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
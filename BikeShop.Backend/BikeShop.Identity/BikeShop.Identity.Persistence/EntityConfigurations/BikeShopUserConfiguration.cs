using BikeShop.Identity.Domain;
using BikeShop.Identity.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BikeShop.Identity.Persistence.EntityConfigurations;

public class BikeShopUserConfiguration : IEntityTypeConfiguration<BikeShopUser>
{
    public void Configure(EntityTypeBuilder<BikeShopUser> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.PhoneNumber).IsUnique();
    }
}
﻿using BikeShop.Identity.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BikeShop.Identity.Persistence.EntityConfigurations;

public class BikeShopUserConfiguration : IEntityTypeConfiguration<BikeShopUser>
{
    public void Configure(EntityTypeBuilder<BikeShopUser> builder)
    {
        builder.HasKey(x => x.Id);
        
    }
}

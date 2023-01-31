using BikeShop.Identity.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BikeShop.Identity.Persistence.EntityConfigurations;

// Конфигурация пользователя программы для fluent api
public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.PhoneNumber).IsUnique();
    }
}
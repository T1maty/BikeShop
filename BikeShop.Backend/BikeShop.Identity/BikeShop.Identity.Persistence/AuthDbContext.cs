using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.Persistence.EntityConfigurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Persistence;

public class AuthDbContext : IdentityDbContext<BikeShopUser>, IAuthDbContext
{
    public DbSet<RefreshSession> RefreshSessions { get; set; }

    public AuthDbContext(DbContextOptions<AuthDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new BikeShopUserConfiguration());

        builder.Entity<BikeShopUser>(entity => entity.ToTable(name: "Users"));
        builder.Entity<IdentityRole>(entity => entity.ToTable(name: "Roles"));
        builder.Entity<IdentityUserRole<string>>(entity =>
            entity.ToTable(name: "UserRoles"));
        builder.Entity<IdentityUserClaim<string>>(entity =>
            entity.ToTable(name: "UserClaim"));
        builder.Entity<IdentityUserLogin<string>>(entity =>
            entity.ToTable("UserLogins"));
        builder.Entity<IdentityUserToken<string>>(entity =>
            entity.ToTable("UserTokens"));
        builder.Entity<IdentityRoleClaim<string>>(entity =>
            entity.ToTable("RoleClaims"));

        builder.Entity<RefreshSession>(entity =>
            entity.ToTable("Sessions"));
    }
}
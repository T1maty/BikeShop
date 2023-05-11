using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.Persistence.EntityConfigurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Persistence;

// Главный DbContext программы
public class AuthDbContext : IdentityDbContext<ApplicationUser>, IAuthDbContext
{
    // Сессии, основанные на рефреш токенах
    public DbSet<RefreshSession> RefreshSessions { get; set; }
    public DbSet<RoleGroup> RoleGroups { get; set; }
    public DbSet<RoleGroupBind> RoleGroupBinds { get; set; }

    public AuthDbContext(DbContextOptions<AuthDbContext> options)
        : base(options)
    {
        // Позволяет не конвертировать время в UTC для postgresql
        // AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        // AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Конфигурация сущности юзера
        builder.ApplyConfiguration(new ApplicationUserConfiguration());

        // Переименовывание стандартных identity таблиц
        builder.Entity<ApplicationUser>(entity => entity.ToTable(name: "Users"));
        builder.Entity<IdentityRole>(entity => entity.ToTable(name: "Roles"));
        builder.Entity<IdentityUserRole<string>>(entity => entity.ToTable(name: "UserRoles"));
        builder.Entity<IdentityUserClaim<string>>(entity => entity.ToTable(name: "UserClaim"));
        builder.Entity<IdentityUserLogin<string>>(entity => entity.ToTable("UserLogins"));
        builder.Entity<IdentityUserToken<string>>(entity => entity.ToTable("UserTokens"));
        builder.Entity<IdentityRoleClaim<string>>(entity => entity.ToTable("RoleClaims"));

        // Создание первого стандартного пользователя и роли user
        var hasher = new PasswordHasher<ApplicationUser>();

        builder.Entity<IdentityRole>().HasData(new IdentityRole()
        {
            Id = Guid.NewGuid().ToString(),
            Name = "user",
            NormalizedName = "USER"
        }, new IdentityRole()
        {
            Id = Guid.NewGuid().ToString(),
            Name = "admin",
            NormalizedName = "ADMIN"
        }, new IdentityRole()
        {
            Id = Guid.NewGuid().ToString(),
            Name = "employee",
            NormalizedName = "EMPLOYEE"
        }, new IdentityRole()
        {
            Id = Guid.NewGuid().ToString(),
            Name = "superemployee",
            NormalizedName = "SUPEREMPLOYEE"
        });
    }
}
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Domain.Entities;

// Пользователь
public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public int ShopId { get; set; } = 0;
    public bool IsEmployee { get; set; } = false;
    public string Secret { get; set; } = string.Empty;

    public string Bike { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public decimal CreditLimit { get; set; }

    public string? FacebookId { get; set; } = null;
    public string? GoogleId { get; set; } = null;
    public string? Gender { get; set; } = null;
    public DateTime? Birth { get; set; } = null;
    public string? Language { get; set; } = null;


    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime Updated { get; set; } = DateTime.Now;
}
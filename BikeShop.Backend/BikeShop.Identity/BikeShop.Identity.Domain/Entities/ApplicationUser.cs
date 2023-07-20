using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Domain.Entities;

// Пользователь
public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public int ShopId { get; set; }
    public string Secret { get; set; } = string.Empty;

    public string Bike { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public decimal CreditLimit { get; set; }
}
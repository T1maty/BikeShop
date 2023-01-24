using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Domain.Entities;

public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }

    public int ShopId { get; set; }
    
    public Guid RefreshToken { get; set; }
}
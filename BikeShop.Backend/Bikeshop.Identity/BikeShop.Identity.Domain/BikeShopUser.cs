using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Domain;

public class BikeShopUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    
    public int ShopId { get; set; }
}
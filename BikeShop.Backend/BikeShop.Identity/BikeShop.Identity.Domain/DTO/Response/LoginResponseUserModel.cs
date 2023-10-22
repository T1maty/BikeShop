using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class LoginResponseUserModel
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    
    public int ShopId { get; set; }
    public decimal Balance { get; set; }
    public decimal CreditLimit { get; set; }
    
    public Guid Id { get; set; }
    public string? Email { get; set; }
    public string PhoneNumber { get; set; }
    
    public bool EmailConfirmed { get; set; }
    public bool PhoneNumberConfirmed { get; set; }
    
    public IList<string> Roles { get; set; }
}
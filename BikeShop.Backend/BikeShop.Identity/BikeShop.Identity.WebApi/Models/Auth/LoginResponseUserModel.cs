using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Domain.Entities;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class LoginResponseUserModel : IMappable
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    
    public int ShopId { get; set; }
    public decimal Balance { get; set; }
    public int BalanceCurrencyId { get; set; }
    public decimal CreditLimit { get; set; }
    
    public Guid Id { get; set; }
    public string? Email { get; set; }
    public string PhoneNumber { get; set; }
    
    public bool EmailConfirmed { get; set; }
    public bool PhoneNumberConfirmed { get; set; }
    
    public IList<string> Roles { get; set; }
    
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<ApplicationUser, LoginResponseUserModel>();
    }
}
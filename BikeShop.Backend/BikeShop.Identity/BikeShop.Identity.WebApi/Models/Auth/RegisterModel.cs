using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class RegisterModel : IMappable
{
    public string Phone { get; set; }
    public string Password { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public int ShopId { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<RegisterModel, CreateUserCommand>();
    }
}
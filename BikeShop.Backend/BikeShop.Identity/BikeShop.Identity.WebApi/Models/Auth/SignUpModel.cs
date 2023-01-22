using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class SignUpModel : IMappable
{
    [Required] [Phone] public string PhoneNumber { get; set; }
    [Required] public string Password { get; set; }
    [Required] public int ShopId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public string? Email { get; set; }
    public void Mapping(Profile profile)
    {
        profile.CreateMap<SignUpModel, CreateUserCommand>();
    }
}
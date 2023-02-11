using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;

namespace BikeShop.Identity.WebApi.Models.Auth;

// Входящая модель регистрации пользователя на endpoint /auth/register
public class RegisterModel : IMappable
{
    [Required] public string Phone { get; set; }
    [Required] public string Password { get; set; }
    // public string? Email { get; set; }
    // public string? FirstName { get; set; }
    // public string? LastName { get; set; }
    // public string? Patronymic { get; set; }
    // public int ShopId { get; set; } = 0;

    public void Mapping(Profile profile)
    {
        profile.CreateMap<RegisterModel, CreateUserCommand>();
    }
}
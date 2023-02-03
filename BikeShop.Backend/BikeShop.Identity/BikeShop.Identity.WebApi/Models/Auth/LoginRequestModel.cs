using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

namespace BikeShop.Identity.WebApi.Models.Auth;

// Входящая модель логина пользователя на endpoint /auth/login
public class LoginRequestModel : IMappable
{
    public string? Phone { get; set; } = null;
    public string? Email { get; set; } = null;
    [Required] public string Password { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<LoginRequestModel, GetUserBySignInDataQuery>();
    }
}
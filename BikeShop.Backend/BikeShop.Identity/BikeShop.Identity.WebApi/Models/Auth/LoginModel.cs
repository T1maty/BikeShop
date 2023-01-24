using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class LoginModel : IMappable
{
    public string Phone { get; set; }
    public string Password { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<LoginModel, GetUserBySignInDataQuery>();
    }
}
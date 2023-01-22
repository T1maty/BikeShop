using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Models;

public class SignInModel : IMappable
{
    [FromForm(Name = "client_id")] public string ClientId { get; set; }
    [FromForm(Name = "phone")] public string PhoneNumber { get; set; }
    [FromForm(Name = "password")] public string Password { get; set; }
    
    [FromForm(Name = "fingerprint")] public string Fingerprint { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<SignInModel, GetAccessTokensQuery>();
    }
}
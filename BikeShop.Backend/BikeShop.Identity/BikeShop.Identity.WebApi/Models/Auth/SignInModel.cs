using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class SignInModel : IMappable
{
    [Required]
    [FromForm(Name = "client_id")]
    public string ClientId { get; set; }

    [Required]
    [FromForm(Name = "phone")]
    [Phone]
    public string PhoneNumber { get; set; }

    [Required]
    [FromForm(Name = "password")]
    public string Password { get; set; }

    [Required]
    [FromForm(Name = "fingerprint")]
    public string Fingerprint { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<SignInModel, GetAccessTokensQuery>();
        profile.CreateMap<SignInModel, GetUserByUsernameQuery>();
    }
}
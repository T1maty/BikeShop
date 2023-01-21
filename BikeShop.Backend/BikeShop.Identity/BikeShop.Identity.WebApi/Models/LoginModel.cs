using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BikeShop.Identity.WebApi.Models;

public class LoginModel : IMappable
{
    [FromForm(Name = "client_id")]
    public string ClientId { get; set; }
    [FromForm(Name = "client_secret")]
    public string ClientSecret { get; set; }
    [FromForm(Name = "email")]
    public string Email { get; set; }
    [FromForm(Name = "password")]
    public string Password { get; set; }
    [FromForm(Name = "grand_type")]
    public string GrantType { get; set; }
    [FromForm(Name = "scope")]
    public string Scope { get; set; }
    [FromForm(Name = "refresh_token")]
    public string RefreshToken { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<LoginModel, GetAccessTokensQuery>();
    }
}
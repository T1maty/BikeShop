using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSessionByToken;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class RefreshModel : IMappable
{
    [Required]
    [FromForm(Name = "client_id")]
    public string ClientId { get; set; }

    [Required]
    [FromForm(Name = "refresh_token")]
    public string RefreshToken { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<RefreshModel, UpdateRefreshSessionByTokenCommand>();
    }
}
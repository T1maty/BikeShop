using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class LoginResponseModel
{
    public string AccessToken { get; set; }
    public LoginResponseUserModel User { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace BikeShop.Identity.WebApi.Models.Auth;

// Входящая модель логина пользователя на endpoint /auth/login
public class LoginRequestModel
{
    public string? Phone { get; set; } = null;
    public string? Email { get; set; } = null;
    [Required] public string Password { get; set; }
}
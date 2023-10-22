using System.ComponentModel.DataAnnotations;

namespace BikeShop.Identity.WebApi.Models.Auth;

// Входящая модель регистрации пользователя на endpoint /auth/register
public class RegisterModel
{
    [Required] public string Phone { get; set; }
    [Required] public string Password { get; set; }
    // public string? Email { get; set; }
    // public string? FirstName { get; set; }
    // public string? LastName { get; set; }
    // public string? Patronymic { get; set; }
    // public int ShopId { get; set; } = 0;
}
using System.ComponentModel.DataAnnotations;

namespace BikeShop.Identity.WebApi.Models;

public class SignUpModel
{
    [Required] [Phone] public string PhoneNumber { get; set; }
    [Required] public string Password { get; set; }
    [Required] public int ShopId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public string? Email { get; set; }
}
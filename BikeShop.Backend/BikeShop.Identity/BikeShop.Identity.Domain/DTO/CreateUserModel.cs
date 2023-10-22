using System.ComponentModel.DataAnnotations;

namespace BikeShop.Identity.WebApi.Models.User;

public class CreateUserModel
{
    [Required] public string Phone { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
}
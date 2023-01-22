using System.ComponentModel.DataAnnotations;

namespace BikeShop.Identity.WebApi.Models.Auth;

public class RefreshModel
{
    [Required] public string ClientId { get; set; }
    [Required] public string RefreshToken { get; set; }
}
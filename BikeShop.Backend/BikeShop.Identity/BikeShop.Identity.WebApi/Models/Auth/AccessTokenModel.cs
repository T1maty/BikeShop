namespace BikeShop.Identity.WebApi.Models.Auth;

// Модель, возвращаемая клиенту с JWT-аксесс токеном
public class AccessTokenModel
{
    public string AccessToken { get; set; }
}


namespace BikeShop.Identity.WebApi.Models.User;

public class GetUserByPhoneOrFioModel
{
    public string? FIO { get; set; } = string.Empty;
    public string? Phone { get; set; } = string.Empty;
}
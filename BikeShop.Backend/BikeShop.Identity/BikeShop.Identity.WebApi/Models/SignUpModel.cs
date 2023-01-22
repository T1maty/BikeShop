namespace BikeShop.Identity.WebApi.Models;

public class SignUpModel
{
    public string PhoneNumber { get; set; }
    public string Password { get; set; }
    public int ShopId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Email { get; set; }
}
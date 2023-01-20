namespace BikeShop.Identity.WebApi.Models;

public class RegisterModel
{
    public string Email { get; set; }
    public string Password { get; set; }
    public int ShopId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Phone { get; set; }
}
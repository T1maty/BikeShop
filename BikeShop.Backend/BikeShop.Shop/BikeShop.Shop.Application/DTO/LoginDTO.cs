namespace BikeShop.Shop.Application.DTO;

public class LoginDTO
{
    public Guid UserId { get; set; }
    public int ShopId { get; set; }
    public string Secret { get; set; }
}
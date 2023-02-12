namespace BikeShop.Shop.Application.Exception;

public interface IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }
}
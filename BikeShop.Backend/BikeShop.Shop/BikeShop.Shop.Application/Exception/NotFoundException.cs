namespace BikeShop.Shop.Application.Exception;

public class NotFoundException : System.Exception, IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }

    public NotFoundException(string? message) : base(message)
    {
    }
}
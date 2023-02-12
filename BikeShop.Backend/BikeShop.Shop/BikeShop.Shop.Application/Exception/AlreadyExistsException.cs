namespace BikeShop.Shop.Application.Exception;

public class AlreadyExistsException : System.Exception, IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }

    public AlreadyExistsException(string? message) : base(message)
    {
    }
}
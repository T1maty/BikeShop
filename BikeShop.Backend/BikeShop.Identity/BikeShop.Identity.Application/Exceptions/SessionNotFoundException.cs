namespace BikeShop.Identity.Application.Exceptions;

public class SessionNotFoundException : Exception
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }
}
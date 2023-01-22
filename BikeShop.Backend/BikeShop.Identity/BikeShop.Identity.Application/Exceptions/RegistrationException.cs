namespace BikeShop.Identity.Application.Exceptions;

public class RegistrationException : Exception
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }
}
namespace BikeShop.Identity.Application.Exceptions;

public class RefreshTokenNotGivenException : Exception, IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }
}
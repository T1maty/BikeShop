namespace BikeShop.Identity.Application.Exceptions;

public class SignInDataException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; }
    public string? ReasonField { get; set; }

    public SignInDataException(string? message) : base(message)
    {
    }
}
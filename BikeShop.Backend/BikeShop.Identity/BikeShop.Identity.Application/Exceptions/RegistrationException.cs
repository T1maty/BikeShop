namespace BikeShop.Identity.Application.Exceptions;

public class RegistrationException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; }
    public string? ReasonField { get; set; }

    public RegistrationException(string message) : base(message) {}
}
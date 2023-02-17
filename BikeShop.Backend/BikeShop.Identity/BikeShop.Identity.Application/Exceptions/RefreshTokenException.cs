namespace BikeShop.Identity.Application.Exceptions;

public class RefreshTokenException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; } = string.Empty;
    public string? ReasonField { get; set; }

    public RefreshTokenException(string message) : base(message) {}
}
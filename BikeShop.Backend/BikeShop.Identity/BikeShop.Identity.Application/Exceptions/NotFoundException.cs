namespace BikeShop.Identity.Application.Exceptions;

public class NotFoundException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; } = string.Empty;
    public string? ReasonField { get; set; }

    public NotFoundException(string message) : base(message) {}
}
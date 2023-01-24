namespace BikeShop.Identity.Application.Exceptions;

public class NotFoundException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; } = string.Empty;

    public NotFoundException(string message) : base(message) {}
}
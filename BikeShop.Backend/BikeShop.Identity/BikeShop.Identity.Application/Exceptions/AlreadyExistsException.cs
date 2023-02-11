namespace BikeShop.Identity.Application.Exceptions;

public class AlreadyExistsException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; } = string.Empty;

    public AlreadyExistsException(string message) : base(message) {}
}
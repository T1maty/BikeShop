namespace BikeShop.Identity.Application.Exceptions;

public class GetUsersException : Exception, IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; } = string.Empty;
    public string? ReasonField { get; set; }

    public GetUsersException(string message) : base(message) {}
}
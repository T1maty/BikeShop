namespace BikeShop.Identity.Application.Exceptions;

public interface IException
{
    public string? Error { get; set; }
    public string? ErrorDescription { get; set; }
    public string? ReasonField { get; set; }
}
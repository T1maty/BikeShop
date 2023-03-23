using BikeShop.Products.Application.Common.Errors;

namespace BikeShop.Products.Application.Common.Exceptions;

public sealed class AlreadyExistsException : Exception, IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }
    public string? ReasonField { get; set; }

    public AlreadyExistsException(string message) : base(message)
    {
    }
}
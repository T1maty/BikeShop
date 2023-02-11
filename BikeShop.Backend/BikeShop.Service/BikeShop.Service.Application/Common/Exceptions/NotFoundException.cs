namespace BikeShop.Service.Application.Common.Exceptions;

public sealed class NotFoundException : Exception, IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }

    public NotFoundException(string message) : base(message)
    {
    }
}
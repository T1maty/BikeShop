namespace BikeShop.Service.Application.Common.Exceptions;

public sealed class AlreadyExistsException : Exception, IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }

    public AlreadyExistsException(string message) : base(message)
    {
    }
}
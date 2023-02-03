namespace BikeShop.Service.Application.Common.Exceptions;

public interface IException
{
    public string Error { get; set; }
    public string ErrorDescription { get; set; }
}
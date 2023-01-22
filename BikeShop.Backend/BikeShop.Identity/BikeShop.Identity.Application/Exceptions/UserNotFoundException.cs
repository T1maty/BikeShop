namespace BikeShop.Identity.Application.Exceptions;

public class UserNotFoundException : Exception
{
    public UserNotFoundException(object value)
        : base($"User with value '{value}' not found'")
    {
    }
}
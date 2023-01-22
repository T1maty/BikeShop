namespace BikeShop.Identity.Application.Exceptions;

public class RefreshTokenAbsentException : Exception
{
    public RefreshTokenAbsentException(object key) 
        : base($"Refresh token '{key}' not found at current sessions")
    {
    }
}
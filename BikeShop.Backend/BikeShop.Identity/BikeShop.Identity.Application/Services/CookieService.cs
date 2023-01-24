using Microsoft.AspNetCore.Http;

namespace BikeShop.Identity.Application.Services;

public class CookieService
{
    public void AddRefreshCookieToResponse(HttpResponse response, Guid refreshToken)
    {
        response.Cookies.Append("X-Refresh-Token", refreshToken.ToString(),
            new CookieOptions { HttpOnly = true, SameSite = SameSiteMode.Lax });
    }
}
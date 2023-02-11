using BikeShop.Identity.Application.Exceptions;
using Microsoft.AspNetCore.Http;

namespace BikeShop.Identity.Application.Services;

// Сервис для работы с куки
public class CookieService
{
    // Вставить рефреш токен в http-only cookie
    public void AddRefreshCookieToResponse(HttpResponse response, Guid refreshToken)
    {
        response.Cookies.Append("X-Refresh-Token", refreshToken.ToString(),
            new CookieOptions { HttpOnly = true, SameSite = SameSiteMode.Lax });
    }

    // Достать рефреш токен из http-only cookie
    public string GetRefreshTokenFromCookie(HttpRequest request)
    {
        // Пытаюсь достать из куки рефреш токен. Если его нет - исключение
        if (!request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken))
            throw new RefreshTokenException("Cookie refresh token not found")
            {
                Error = "cookie_refresh_token_not_found",
                ErrorDescription = "Expected refresh token in httponly cookie does not exists"
            };

        return refreshToken;
    }
}
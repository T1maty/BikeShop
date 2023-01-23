using System.Net;
using BikeShop.Identity.Application.Exceptions;

namespace BikeShop.Identity.WebApi.Middleware;

public class CustomExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public CustomExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch (Exception exception)
        {
            await HandleExceptionAsync(exception, context);
        }
    }

    private Task HandleExceptionAsync(Exception exception, HttpContext context)
    {
        var code = HttpStatusCode.InternalServerError;
        IException? result = null;

        switch (exception)
        {
            case NotFoundException notFoundException:
                code = HttpStatusCode.NotFound;
                result = notFoundException;
                break;

            case RegistrationException registrationException:
                code = HttpStatusCode.BadRequest;
                result = registrationException;
                break;

            case RefreshTokenNotGivenException refreshNotGivenException:
                result = refreshNotGivenException;
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;

        return result is null
            ? context.Response.WriteAsJsonAsync(result)
            : context.Response.WriteAsJsonAsync(new
            {
                error = "internal_server_error",
                errorDescription = "Unknown server error"
            });
    }
}

public static class CustomExceptionHandlerMiddlewareExtension
{
    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<CustomExceptionHandlerMiddleware>();
    }
}


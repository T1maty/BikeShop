using System.Net;
using System.Text.Json;
using BikeShop.Identity.Application.Exceptions;

namespace BikeShop.Identity.WebApi.Middleware;

// Обработчик исключений, возвращающий ответы клиенту с статус кодами и моделью ошибки
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
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = HttpStatusCode.InternalServerError;
        IException? result = null;

        switch (exception)
        {
            case NotFoundException notFoundException:
                statusCode = HttpStatusCode.NotFound;
                result = notFoundException;
                break;
            case RegistrationException registrationException:
                statusCode = HttpStatusCode.BadRequest;
                result = registrationException;
                break;
            case RefreshTokenException refreshTokenException:
                statusCode = HttpStatusCode.NotAcceptable;
                result = refreshTokenException;
                break;
            case SignInDataException signInDataException:
                statusCode = HttpStatusCode.BadRequest;
                result = signInDataException;
                break;
            case AlreadyExistsException alreadyExistsException:
                statusCode = HttpStatusCode.Conflict;
                result = alreadyExistsException;
                break;
            case GetUsersException getUsersException:
                statusCode = HttpStatusCode.BadRequest;
                result = getUsersException;
                break;
            default:
                Console.WriteLine(exception);
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        return result is not null
            ? context.Response.WriteAsJsonAsync(result)
            : context.Response.WriteAsJsonAsync(new
            {
                error = "error_unknown",
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
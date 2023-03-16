using System.Net;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.Common.Exceptions;

namespace BikeShop.Products.WebApi.Middleware;

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
            case AlreadyExistsException alreadyExistsException:
                statusCode = HttpStatusCode.Conflict;
                result = alreadyExistsException;
                break;
            case InvalidFormatException invalidFormatException:
                statusCode = HttpStatusCode.BadRequest;
                result = invalidFormatException;
                break;
            case BaseError baseError:
                statusCode = HttpStatusCode.BadRequest;
                result = baseError;
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
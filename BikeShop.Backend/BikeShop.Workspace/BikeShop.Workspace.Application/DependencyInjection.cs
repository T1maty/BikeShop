using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Workspace.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Инжект библиотеки mediatr для CQRS
        services.AddMediatR(Assembly.GetExecutingAssembly());

        return services;
    }
}
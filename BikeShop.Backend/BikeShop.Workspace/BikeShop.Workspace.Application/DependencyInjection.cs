using Microsoft.Extensions.DependencyInjection;

namespace BikeShop.Workspace.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // ...

        return services;
    }
}
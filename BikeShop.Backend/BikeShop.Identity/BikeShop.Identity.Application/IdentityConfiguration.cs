using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace BikeShop.Identity.Application;

// Информация о клиентах, пользующихся идентити сервером
public static class IdentityConfiguration
{
    // Скоуп(область) представляет то, что приложению можно использовать
    // Идентификатор для ресурсов. Можно считать как доступ к областям
    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
            new("MainScope", "Main web api scope")
        };

    // Области, куда можно получить доступ, называются ресурсы
    // Это могут быть identity и api ресурсы
    // identity ресурсы позволяют узнавать информацию и пользователе
    // api ресурсы позволяют достукиваться до нужных защищенных эндпоинтов

    public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new ApiResource("MainResource", "Main web api resource",
                new[] { JwtClaimTypes.Name })
            {
                Scopes = new List<string>() { "MainScope" }
            }
        };

    // Клиенты - приложения, которые получают доступ к идентити серверу
    public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            new Client
            {
                ClientId = "test-client-id",
                ClientName = "test-client-name",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                RequireClientSecret = false,
                RequirePkce = false,
                RedirectUris =
                {
                    "http://.../signin-oidc"
                },
               
                PostLogoutRedirectUris =
                {
                    "http://.../signout-oidc"
                },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "MainScope"
                },
                AllowAccessTokensViaBrowser = true
            }
        };
}
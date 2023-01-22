using System.Collections.Specialized;
using IdentityModel;
using MediatR;
using BikeShop.Identity.Application.Services;
using IdpTokenResponse = IdentityServer4.ResponseHandling.TokenResponse;

namespace BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;

public class GetAccessTokensQueryHandler : IRequestHandler<GetAccessTokensQuery, AccessTokensModel>
{
    private readonly TokenService _tokenService;

    public GetAccessTokensQueryHandler(TokenService tokenService)
    {
        _tokenService = tokenService;
    }

    public async Task<AccessTokensModel> Handle(GetAccessTokensQuery request, CancellationToken cancellationToken)
    {
        var parameters = new NameValueCollection
        {
            { "client_id", request.ClientId },
            // { "client_secret", request.ClientSecret },
            { "username", request.PhoneNumber.TrimStart('+') },
            { "password", request.Password },
            { "grant_type", "password" },
            { "scope", "webapi offline_access" },
            { "response_type", OidcConstants.ResponseTypes.CodeIdTokenToken }
        };

        var response = await _tokenService.GetIdpToken(parameters);

        return _tokenService.GetTokenResponse(response);
    }
}
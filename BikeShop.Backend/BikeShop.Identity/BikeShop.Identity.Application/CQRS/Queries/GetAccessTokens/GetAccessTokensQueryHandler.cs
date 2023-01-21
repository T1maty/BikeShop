using System.Collections.Specialized;
using IdentityModel;
using MediatR;
using IdentityServer4.ResponseHandling;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using IdpTokenResponse = IdentityServer4.ResponseHandling.TokenResponse;

namespace BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;

public class GetAccessTokensQueryHandler : IRequestHandler<GetAccessTokensQuery, AccessTokensModel>
{
    private readonly ITokenRequestValidator _requestValidator;
    private readonly IClientSecretValidator _clientValidator;
    private readonly ITokenResponseGenerator _responseGenerator;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetAccessTokensQueryHandler(ITokenRequestValidator requestValidator, IClientSecretValidator clientValidator,
        ITokenResponseGenerator responseGenerator, IHttpContextAccessor httpContextAccessor)
    {
        _requestValidator = requestValidator;
        _clientValidator = clientValidator;
        _responseGenerator = responseGenerator;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<AccessTokensModel> Handle(GetAccessTokensQuery request, CancellationToken cancellationToken)
    {
        Console.WriteLine("CQRS QUERY");
        Console.WriteLine(JsonSerializer.Serialize(request));

        var parameters = new NameValueCollection
        {
            { "client_id", request.ClientId },
           // { "client_secret", request.ClientSecret },
            { "username", request.Email.Split('@').First() },
            { "password", request.Password },
            { "grant_type", request.GrantType },
            { "scope", request.Scope },
            { "refresh_token", request.RefreshToken },
            { "response_type", OidcConstants.ResponseTypes.CodeIdTokenToken }
        };

        var response = await GetIdpToken(parameters);

        return GetTokenResponse(response);
    }


    private async Task<IdpTokenResponse> GetIdpToken(NameValueCollection parameters)
    {
        var clientResult = await _clientValidator.ValidateAsync(_httpContextAccessor.HttpContext);

        if (clientResult.IsError)
        {
            return new IdpTokenResponse
            {
                Custom = new Dictionary<string, object>
                {
                    { "Error", "invalid_client" },
                    { "ErrorDescription", "Invalid client/secret combination" }
                }
            };
        }

        
        var validationResult = await _requestValidator.ValidateRequestAsync(parameters, clientResult);

        if (validationResult.IsError)
        {
            return new IdpTokenResponse
            {
                Custom = new Dictionary<string, object>
                {
                    { "Error", validationResult.Error },
                    { "ErrorDescription", validationResult.ErrorDescription }
                }
            };
        }

        return await _responseGenerator.ProcessAsync(validationResult);
    }

    private static AccessTokensModel GetTokenResponse(IdpTokenResponse response)
    {
        if (response.Custom != null && response.Custom.ContainsKey("Error"))
        {
            return new AccessTokensModel
            {
                Error = response.Custom["Error"].ToString(),
                ErrorDescription = response.Custom["ErrorDescription"]?.ToString()
            };
        }

        return new AccessTokensModel
        {
            AccessToken = response.AccessToken,
            RefreshToken = response.RefreshToken,
            ExpiresIn = response.AccessTokenLifetime,
            TokenType = "Bearer"
        };
    }
}
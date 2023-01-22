using System.Collections.Specialized;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using IdentityServer4.ResponseHandling;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Http;
using IdpTokenResponse = IdentityServer4.ResponseHandling.TokenResponse;

namespace BikeShop.Identity.Application.Services;

public class TokenService
{
    private readonly ITokenRequestValidator _requestValidator;
    private readonly IClientSecretValidator _clientValidator;
    private readonly ITokenResponseGenerator _responseGenerator;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TokenService(ITokenRequestValidator requestValidator, IClientSecretValidator clientValidator,
        ITokenResponseGenerator responseGenerator, IHttpContextAccessor httpContextAccessor)
    {
        _requestValidator = requestValidator;
        _clientValidator = clientValidator;
        _responseGenerator = responseGenerator;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IdpTokenResponse> GetIdpToken(NameValueCollection parameters)
    {
        var clientResult = await _clientValidator.ValidateAsync(_httpContextAccessor.HttpContext);

        if (clientResult.IsError)
        {
            return new IdpTokenResponse
            {
                Custom = new Dictionary<string, object>
                {
                    { "Error", "invalid_client" },
                    { "ErrorDescription", "Invalid client. Possible incorrect client_id" }
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

    public AccessTokensModel GetTokenResponse(IdpTokenResponse response)
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
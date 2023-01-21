using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;

public class GetAccessTokensQuery : IRequest<AccessTokensModel>
{
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string GrantType { get; set; }
    public string Scope { get; set; }
    public string RefreshToken { get; set; }
}
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;

public class GetAccessTokensQuery : IRequest<AccessTokensModel>
{
    public string ClientId { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
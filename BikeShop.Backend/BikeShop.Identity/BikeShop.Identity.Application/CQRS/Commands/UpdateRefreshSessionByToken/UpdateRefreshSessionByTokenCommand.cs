using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSessionByToken;

public class UpdateRefreshSessionByTokenCommand : IRequest<AccessTokensModel>
{
    public string ClientId { get; set; }
    public string RefreshToken { get; set; }
}
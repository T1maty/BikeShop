using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.DeleteRefreshSessionByToken;

public class DeleteRefreshSessionByTokenCommand : IRequest
{
    public Guid RefreshToken { get; set; }
}
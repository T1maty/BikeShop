using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.DeleteRefreshSessionByToken;

// Удалить сессию по рефреш токену
public class DeleteRefreshSessionByTokenCommand : IRequest
{
    public Guid RefreshToken { get; set; }
}
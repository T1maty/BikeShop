using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSession;

// Обновить сессию по рефреш токену
public class UpdateRefreshSessionCommand : IRequest<RefreshSession>
{
    public Guid RefreshToken { get; set; }
}
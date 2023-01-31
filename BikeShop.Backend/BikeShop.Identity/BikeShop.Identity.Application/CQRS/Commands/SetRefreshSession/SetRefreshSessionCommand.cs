using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.SetRefreshSession;

// Создать/обновить рефреш сессию по айди пользователя
public class SetRefreshSessionCommand : IRequest<Guid>
{
    public Guid UserId { get; set; }
}
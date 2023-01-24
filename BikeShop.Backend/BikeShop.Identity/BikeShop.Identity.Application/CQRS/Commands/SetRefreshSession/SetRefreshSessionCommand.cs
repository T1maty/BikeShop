using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.SetRefreshSession;

public class SetRefreshSessionCommand : IRequest<Guid>
{
    public Guid UserId { get; set; }
}
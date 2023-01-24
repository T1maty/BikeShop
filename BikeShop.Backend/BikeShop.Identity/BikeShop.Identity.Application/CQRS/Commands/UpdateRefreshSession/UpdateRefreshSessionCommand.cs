using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSession;

public class UpdateRefreshSessionCommand : IRequest<RefreshSession>
{
    public Guid RefreshToken { get; set; }
}
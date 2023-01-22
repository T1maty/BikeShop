using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateRefreshSession;

public class CreateRefreshSessionCommandHandler : IRequestHandler<CreateRefreshSessionCommand>
{
    public Task<Unit> Handle(CreateRefreshSessionCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
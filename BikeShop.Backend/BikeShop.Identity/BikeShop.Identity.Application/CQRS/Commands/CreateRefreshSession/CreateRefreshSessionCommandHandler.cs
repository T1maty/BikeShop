using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateRefreshSession;

public class CreateRefreshSessionCommandHandler : IRequestHandler<CreateRefreshSessionCommand>
{
    private readonly IAuthDbContext _context;

    public CreateRefreshSessionCommandHandler(IAuthDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateRefreshSessionCommand request, CancellationToken cancellationToken)
    {
        // Экземпляр сессии
        var refreshSession = new RefreshSession
        {
            RefreshToken = request.RefreshToken,
            UserId = request.UserId,
            Fingerprint = request.Fingerprint,
            ExpiresIn = request.ExpiresIn
        };

        // Добавляю и сохраняю
        _context.RefreshSessions.Add(refreshSession);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
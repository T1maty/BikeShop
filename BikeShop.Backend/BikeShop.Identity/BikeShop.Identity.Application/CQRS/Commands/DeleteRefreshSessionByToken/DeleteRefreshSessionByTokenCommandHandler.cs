using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.CQRS.Commands.DeleteRefreshSessionByToken;

// Удалить сессию по рефреш токену
public class DeleteRefreshSessionByTokenCommandHandler : IRequestHandler<DeleteRefreshSessionByTokenCommand>
{
    private readonly IAuthDbContext _context;

    public DeleteRefreshSessionByTokenCommandHandler(IAuthDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteRefreshSessionByTokenCommand request, CancellationToken cancellationToken)
    {
        // Ищу существующую сессию
        var existingSession = await _context.RefreshSessions
            .FirstOrDefaultAsync(session => session.RefreshToken == request.RefreshToken,
                cancellationToken);

        // Если сессии с таким рефреш токеном не существует - ошибка
        if (existingSession is null)
            throw new NotFoundException($"Session with refresh token {request.RefreshToken} not found")
            {
                Error = "session_not_found",
                ErrorDescription = $"Logout failed. Given refresh token does not belong to any session",
                ReasonField = "refreshToken"
            };

        // Удаляю сессию из базы
        _context.RefreshSessions.Remove(existingSession);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
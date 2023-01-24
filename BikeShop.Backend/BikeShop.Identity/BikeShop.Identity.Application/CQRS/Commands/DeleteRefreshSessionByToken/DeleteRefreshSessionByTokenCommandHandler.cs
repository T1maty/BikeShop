using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.CQRS.Commands.DeleteRefreshSessionByToken;

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

        if (existingSession is null)
            throw new NotFoundException();

        // Удаляю сессию из базы
        _context.RefreshSessions.Remove(existingSession);
        await _context.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}
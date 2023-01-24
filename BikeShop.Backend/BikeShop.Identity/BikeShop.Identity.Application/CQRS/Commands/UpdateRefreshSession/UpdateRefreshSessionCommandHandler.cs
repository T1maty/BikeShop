using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSession;

public class UpdateRefreshSessionCommandHandler : IRequestHandler<UpdateRefreshSessionCommand, RefreshSession>
{
    private readonly IAuthDbContext _context;

    public UpdateRefreshSessionCommandHandler(IAuthDbContext context)
    {
        _context = context;
    }

    public async Task<RefreshSession> Handle(UpdateRefreshSessionCommand request, CancellationToken cancellationToken)
    {
        // Ищу сессию с таким рефреш токеном
        var existingSession = await _context.RefreshSessions
            .FirstOrDefaultAsync(session => session.RefreshToken == request.RefreshToken,
                cancellationToken);

        // Если такой сессии нет - исключение
        if (existingSession is null)
            throw new NotFoundException();
        
        // Если есть - обновляю рефреш сессию и возвращаю
        existingSession.RefreshToken = Guid.NewGuid();
        existingSession.UpdatedAt = DateTime.Now;

        await _context.SaveChangesAsync(cancellationToken);

        return existingSession;
    }
}
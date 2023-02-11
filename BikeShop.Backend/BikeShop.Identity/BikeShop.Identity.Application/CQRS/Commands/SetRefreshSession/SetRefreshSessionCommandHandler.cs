using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.Application.CQRS.Commands.SetRefreshSession;

// Создать/обновить рефреш сессию для пользователя
public class SetRefreshSessionCommandHandler : IRequestHandler<SetRefreshSessionCommand, Guid>
{
    private readonly IAuthDbContext _context;

    public SetRefreshSessionCommandHandler(IAuthDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(SetRefreshSessionCommand request, CancellationToken cancellationToken)
    {
        // Существующая сессия для пользователя
        var existingSession = await _context.RefreshSessions
            .FirstOrDefaultAsync(session => session.UserId == request.UserId,
                cancellationToken);

        // Генерирую новый рефреш токен
        var newToken = Guid.NewGuid();

        // Если сессия есть - обновить токен
        if (existingSession is not null)
        {
            existingSession.RefreshToken = newToken;
            existingSession.UpdatedAt = DateTime.Now;
        }
        // Если сессии нет - создать
        else
        {
            _context.RefreshSessions.Add(new RefreshSession()
            {
                UserId = request.UserId,
                RefreshToken = newToken
            });
        }


        await _context.SaveChangesAsync(cancellationToken);

        return newToken;
    }
}
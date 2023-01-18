using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Commands.Work.UpdateWork;

// Обновление услуги
public class UpdateWorkCommandHandler : IRequestHandler<UpdateWorkCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateWorkCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateWorkCommand request, CancellationToken cancellationToken)
    {
        // Получаю с базы услугу по указанному айди
        var work = await _context.Works
            .FirstOrDefaultAsync(work => work.Id == request.Id,
                cancellationToken);
        
        // Если такой услуги нет - исключение
        if (work is null)
            throw new NotFoundException(nameof(Domain.Entities.Work), request.Id);
        
        // Переписываю поля услуги
        work.Name = request.Name;
        work.Description = request.Description;
        work.Price = request.Price;
        work.WorkGroupId = request.GroupId;
        work.CurrencyId = request.CurrencyId;
        work.UpdatedAt = DateTime.Now;

        // Сохраняю
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
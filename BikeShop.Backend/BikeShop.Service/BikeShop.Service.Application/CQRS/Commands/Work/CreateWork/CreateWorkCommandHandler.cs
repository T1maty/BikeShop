using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Application.CQRS.Commands.Work.CreateWork;

// Создание услуги
public class CreateWorkCommandHandler : IRequestHandler<CreateWorkCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateWorkCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateWorkCommand request, CancellationToken cancellationToken)
    {
        // Получаю группу услуг по указанному айди
        var group = await _context.WorkGroups
            .FirstOrDefaultAsync(group => group.Id == request.GroupId,
                cancellationToken);
        
        // Если такой группы нет - исключение
        if (group is null)
            throw new NotFoundException($"Create work error. Work group with id {request.GroupId} not found")
            {
                Error = "group_not_found",
                ErrorDescription = "Create work error. Work group with given id not found"
            };

        // Создаю экземпляр новой услуги
        var newWork = new Domain.Entities.Work
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            WorkGroupId = group.Id
        };

        // Добавляю в базу и сохраняю
        _context.Works.Add(newWork);
        await _context.SaveChangesAsync(cancellationToken);

        // Типа войд
        return Unit.Value;
    }
}
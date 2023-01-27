using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Commands.Work.CreateWork;

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


        // Получаю валюту за услугу по переданному айди
        var currency = await _context.Currencies
            .FirstOrDefaultAsync(currency => currency.Id == request.CurrencyId,
                cancellationToken);

        // Если такой валюты нет - исключение
        if (currency is null)
            throw new NotFoundException($"Create work error. Currency with id {request.CurrencyId} not found")
            {
                Error = "currency_not_found",
                ErrorDescription = "Create work error. Currency with given id not found"
            };


        // Создаю экземпляр новой услуги
        var newWork = new Domain.Entities.Work
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            CurrencyId = currency.Id,
            WorkGroupId = group.Id
        };

        // Добавляю в базу и сохраняю
        _context.Works.Add(newWork);
        await _context.SaveChangesAsync(cancellationToken);

        // Типа войд
        return Unit.Value;
    }
}
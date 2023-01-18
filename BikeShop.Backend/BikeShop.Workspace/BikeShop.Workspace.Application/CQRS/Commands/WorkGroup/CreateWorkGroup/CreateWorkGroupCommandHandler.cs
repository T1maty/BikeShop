using System.Text.Json;
using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.CreateWorkGroup;

// Создание группы услуг в конкретном магазине (по айди магазина)
public class CreateWorkGroupCommandHandler : IRequestHandler<CreateWorkGroupCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateWorkGroupCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateWorkGroupCommand request, CancellationToken cancellationToken)
    {
        Console.WriteLine("COMMAND");
        Console.WriteLine(JsonSerializer.Serialize(request));
        
        // Получаю магазин по указанному айди
        var existingShop = await _context.Shops
            .FirstOrDefaultAsync(shop => shop.Id == request.ShopId,
                cancellationToken);

        // Если такого магазина нет - исключение
        if (existingShop is null)
            throw new NotFoundException(nameof(Shop), new { shopId = request.ShopId });


        // Если группа с таким ParentId существует (если не 0)
        if (request.ParentId != 0)
        {
            var existingGroup = await _context.WorkGroups
                .FirstOrDefaultAsync(group => group.Id == request.ParentId,
                    cancellationToken);

            // Если группы указанным parentId не существует - исключение
            if (existingGroup is null)
                throw new NotFoundException(nameof(Domain.Entities.WorkGroup), new { parentId = request.ParentId });
        }


        // Если уже есть такая группа услуг у магазина - исключение
        if (await GroupNameAtShopExistsAsync(request.ShopId, request.Name, cancellationToken))
            throw new AlreadyExistsException(
                nameof(Domain.Entities.WorkGroup),
                new { shopId = request.ShopId, name = request.Name }
            );


        // Если все ок - создаю группу
        var newGroup = new Domain.Entities.WorkGroup
        {
            Name = request.Name,
            IsCollapsed = request.IsCollapsed,
            ParentId = request.ParentId,
            ShopId = request.ShopId
        };

        // Сохраняю
        _context.WorkGroups.Add(newGroup);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    // Существует ли уже такая группа услуг в магазине
    private async Task<bool> GroupNameAtShopExistsAsync(int shopId, string groupName,
        CancellationToken cancellationToken)
    {
        // Ищу уже существующую группу услуг в магазине с таким названием
        var existingGroup = await _context.WorkGroups
            .FirstOrDefaultAsync(group => group.ShopId == shopId
                                          && group.Name == groupName,
                cancellationToken);
        
        return existingGroup is not null;
    }
}
using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Extensions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Application.Services;
using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.CreateWorkGroup;

// Создание группы услуг в конкретном магазине (по айди магазина)
public class CreateWorkGroupCommandHandler : IRequestHandler<CreateWorkGroupCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly WorkGroupService _workGroupService;

    public CreateWorkGroupCommandHandler(IApplicationDbContext context, WorkGroupService workGroupService)
    {
        _context = context;
        _workGroupService = workGroupService;
    }

    public async Task<Unit> Handle(CreateWorkGroupCommand request, CancellationToken cancellationToken)
    {
        // Существует ли группа услуг с id, указанным в parentId
        // Если нет - исключение
        if (request.ParentId != 0)
        {
            var parentGroup = await _context.WorkGroups
                .FindAsync(request.ParentId, cancellationToken);

            if (parentGroup is null)
                throw new NotFoundException(nameof(Domain.Entities.WorkGroup),
                    new { id = request.ParentId });
        }

        // Существует ли уже услуга с таким названием
        var existingGroup =
            await _workGroupService.GetShopWorkGroupByNameAsync(request.ShopId, request.Name,
                cancellationToken);
        
        // Если да - исключение
        if (existingGroup is not null)
            throw new AlreadyExistsException(nameof(Domain.Entities.WorkGroup),
                new { name = existingGroup.Name });


        // Если все ок - создаю группу и сохраняю в базу
        var newGroup = new Domain.Entities.WorkGroup
        {
            Name = request.Name.ToInsertForm(),
            IsCollapsed = request.IsCollapsed,
            ParentId = request.ParentId,
            ShopId = request.ShopId
        };
        _context.WorkGroups.Add(newGroup);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
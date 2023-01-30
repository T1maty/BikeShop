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
                throw new NotFoundException(
                    $"Create work group error. Parent group with id {request.ParentId} not found")
                {
                    Error = "work_group_not_found",
                    ErrorDescription = "Create work grop error. Parent group with given id not found"
                };
        }

        // Существует ли уже услуга с таким названием
        var existingGroup =
            await _workGroupService.GetShopWorkGroupByNameAsync(request.ShopId, request.Name,
                cancellationToken);

        // Если да - исключение
        if (existingGroup is not null)
            throw new AlreadyExistsException(
                $"Create work group error. Work group with name {request.Name} at shop with id {request.ShopId} already exists")
            {
                Error = "work_group_already_exists",
                ErrorDescription = "Create work group error. Work group with given name at given shop already exists"
            };


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
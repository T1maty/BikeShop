using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Extensions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Application.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.UpdateWorkGroup;

public class UpdateWorkGroupCommandHandler : IRequestHandler<UpdateWorkGroupCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly WorkGroupService _workGroupService;

    public UpdateWorkGroupCommandHandler(IApplicationDbContext context, WorkGroupService workGroupService)
    {
        _context = context;
        _workGroupService = workGroupService;
    }

    public async Task<Unit> Handle(UpdateWorkGroupCommand request, CancellationToken cancellationToken)
    {
        // Существует ли группа услуг с id, указанным в parentId
        // Если нет - исключение
        if (request.ParentId != 0)
        {
            var parentGroup = await _context.WorkGroups
                .FindAsync(request.ParentId, cancellationToken);

            if (parentGroup is null)
                throw new NotFoundException(
                    $"Update work group error. Parent group with id {request.ParentId} not found")
                {
                    Error = "work_group_not_found",
                    ErrorDescription = "Update work grop error. Parent group with given id not found"
                };
        }

        // Существует ли уже услуга с таким названием
        var existingGroup =
            await _workGroupService.GetShopWorkGroupByNameAsync(request.ShopId, request.Name,
                cancellationToken);

        // Если да - исключение
        if (existingGroup is not null)
            throw new AlreadyExistsException(
                $"Update work group error. Work group with name {request.Name} at shop with id {request.ShopId} already exists")
            {
                Error = "work_group_already_exists",
                ErrorDescription = "Update work group error. Work group with given name at given shop already exists"
            };


        // Получаю сущность для обновления
        var workGroup = await _context.WorkGroups.FindAsync(request.Id, cancellationToken);

        // Если сущности с таким айди нету - исключение
        if (workGroup is null)
            throw new NotFoundException($"Update work error. Work group with id {request.Id} not found")
            {
                Error = "work_group_not_found",
                ErrorDescription = "Update work group error. Work group with given id not found"
            };

        // Если все ок - обновляю данные сущности и сохраняю
        workGroup.Name = request.Name.ToInsertForm();
        workGroup.IsCollapsed = request.IsCollapsed;
        workGroup.ShopId = request.ShopId;
        workGroup.ParentId = request.ParentId;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
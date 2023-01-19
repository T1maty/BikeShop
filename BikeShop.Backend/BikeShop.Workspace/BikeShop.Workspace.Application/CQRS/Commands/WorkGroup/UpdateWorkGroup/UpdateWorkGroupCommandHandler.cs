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
        
        
        // Получаю сущность для обновления
        var workGroup = await _context.WorkGroups.FindAsync(request.Id, cancellationToken);

        // Если сущности с таким айди нету - исключение
        if (workGroup is null)
            throw new NotFoundException(nameof(Domain.Entities.WorkGroup), new { id = request.Id });

        // Если все ок - обновляю данные сущности и сохраняю
        workGroup.Name = request.Name.ToInsertForm();
        workGroup.IsCollapsed = request.IsCollapsed;
        workGroup.ShopId = request.ShopId;
        workGroup.ParentId = request.ParentId;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
    
}
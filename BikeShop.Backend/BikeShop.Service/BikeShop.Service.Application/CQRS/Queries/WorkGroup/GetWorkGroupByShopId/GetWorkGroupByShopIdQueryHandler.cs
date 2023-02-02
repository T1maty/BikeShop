using BikeShop.Service.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;

// Получить группы услуг по айди магазина
public class GetWorkGroupByShopIdQueryHandler
    : IRequestHandler<GetWorkGroupByShopIdQuery, WorkGroupListModel>
{
    private readonly IApplicationDbContext _context;

    public GetWorkGroupByShopIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<WorkGroupListModel> Handle(GetWorkGroupByShopIdQuery request, CancellationToken cancellationToken)
    {
        // Получаю лист услуг по айди магазина
        var workGroups = await _context.WorkGroups
            .Where(group => group.ShopId == request.ShopId)
            .ToListAsync(cancellationToken);

        // Засовываю его в модель на возврат и возвращаю
        return new WorkGroupListModel { WorkGroups = workGroups };
    }
}
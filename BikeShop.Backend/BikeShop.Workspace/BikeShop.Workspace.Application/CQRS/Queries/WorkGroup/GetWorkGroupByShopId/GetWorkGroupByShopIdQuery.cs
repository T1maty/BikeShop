using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;

// Получить группы услуг по айди магазина
public class GetWorkGroupByShopIdQuery : IRequest<WorkGroupListModel>
{
    public int ShopId { get; set; }
}
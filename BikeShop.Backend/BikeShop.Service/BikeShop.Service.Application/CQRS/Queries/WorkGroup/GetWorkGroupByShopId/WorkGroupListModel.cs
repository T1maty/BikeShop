namespace BikeShop.Service.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;

public class WorkGroupListModel
{
    public IList<Domain.Entities.WorkGroup> WorkGroups { get; set; }
}
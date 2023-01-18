namespace BikeShop.Workspace.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;

public class WorkGroupListModel
{
    public IList<Domain.Entities.WorkGroup> WorkGroups { get; set; }
}
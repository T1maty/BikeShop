namespace BikeShop.Workspace.Application.CQRS.Queries.GetWorksByGroupId;

public class WorkListModel
{
    public IList<Domain.Entities.Work> Works { get; set; }
}
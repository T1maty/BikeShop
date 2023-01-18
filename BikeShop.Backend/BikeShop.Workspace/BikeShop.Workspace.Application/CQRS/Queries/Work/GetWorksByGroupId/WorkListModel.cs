namespace BikeShop.Workspace.Application.CQRS.Queries.Work.GetWorksByGroupId;

public class WorkListModel
{
    public IList<Domain.Entities.Work> Works { get; set; }
}
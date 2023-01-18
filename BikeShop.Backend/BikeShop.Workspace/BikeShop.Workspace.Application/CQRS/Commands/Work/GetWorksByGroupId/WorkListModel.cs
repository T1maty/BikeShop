namespace BikeShop.Workspace.Application.CQRS.Commands.Work.GetWorksByGroupId;

public class WorkListModel
{
    public IList<Domain.Entities.Work> Works { get; set; }
}
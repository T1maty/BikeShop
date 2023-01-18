using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.UpdateWorkGroup;

public class UpdateWorkGroupCommand : IRequest
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ParentId { get; set; }
    public int ShopId { get; set; }
    public bool IsCollapsed { get; set; }
}
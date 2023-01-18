using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.Work.GetWorksByGroupId;

// Получение всех услуг по айди группы работ
public class GetWorksByGroupIdQuery : IRequest<WorkListModel>
{
    public int GroupId { get; set; }
}
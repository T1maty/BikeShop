using MediatR;

namespace BikeShop.Service.Application.CQRS.Queries.Work.GetWorksByGroupId;

// Получение всех услуг по айди группы работ
public class GetWorksByGroupIdQuery : IRequest<WorkListModel>
{
    public int GroupId { get; set; }
}
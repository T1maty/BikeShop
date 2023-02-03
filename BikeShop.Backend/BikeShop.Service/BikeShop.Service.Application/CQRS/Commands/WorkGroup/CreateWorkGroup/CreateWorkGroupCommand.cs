using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.WorkGroup.CreateWorkGroup;

// Создание группы услуг в конкретном магазине (по айди магазина)
public class CreateWorkGroupCommand : IRequest
{
    public string Name { get; set; }
    public int ParentId { get; set; }
    public int ShopId { get; set; }
    public bool IsCollapsed { get; set; }
}
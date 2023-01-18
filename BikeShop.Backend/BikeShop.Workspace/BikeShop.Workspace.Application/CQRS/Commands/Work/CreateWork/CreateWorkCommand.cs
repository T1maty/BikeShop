using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.Work.CreateWork;

// Создание услуги
public class CreateWorkCommand : IRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public int CurrencyId { get; set; }
    public int GroupId { get; set; }
}
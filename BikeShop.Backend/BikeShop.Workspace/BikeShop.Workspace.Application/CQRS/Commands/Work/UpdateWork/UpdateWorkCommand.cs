using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.Work.UpdateWork;

// Обновление услуги
public class UpdateWorkCommand : IRequest
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public int CurrencyId { get; set; }
    public int GroupId { get; set; }
}
using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.Work.CreateWork;

// Создание услуги
public class CreateWorkCommand : IRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public int GroupId { get; set; }
}
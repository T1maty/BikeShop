using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.Work.UpdateWork;

// Обновление услуги
public class UpdateWorkCommand : IRequest
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public int GroupId { get; set; }
}
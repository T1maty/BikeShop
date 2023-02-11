using MediatR;

namespace BikeShop.Service.Application.CQRS.Queries.Service.GetServiceById;

public class GetServiceByIdQuery : IRequest<Domain.Entities.Service>
{
    public int ServiceId { get; set; }
}
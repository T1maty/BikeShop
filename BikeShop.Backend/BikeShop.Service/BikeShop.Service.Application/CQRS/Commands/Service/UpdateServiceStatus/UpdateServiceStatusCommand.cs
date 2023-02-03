using BikeShop.Service.Domain.Enums;
using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.Service.UpdateServiceStatus;

public class UpdateServiceStatusCommand : IRequest
{
    public int ServiceId { get; set; }
    public Status NewStatus { get; set; }
}

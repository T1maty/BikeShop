using MediatR;

namespace BikeShop.Service.Application.CQRS.Queries.Service.GetOngoingServicesByShopId;

public class GetOngoingServicesByShopIdQuery : IRequest<OngoingServicesModel>
{
    public int ShopId { get; set; }
}
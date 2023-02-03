namespace BikeShop.Service.Application.CQRS.Queries.Service.GetOngoingServicesByShopId;

public class OngoingServicesModel
{
    public IList<Domain.Entities.Service> Services { get; set; }
}
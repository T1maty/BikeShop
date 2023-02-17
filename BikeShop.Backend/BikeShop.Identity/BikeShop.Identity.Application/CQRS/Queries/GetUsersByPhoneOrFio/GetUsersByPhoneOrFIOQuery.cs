using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;

public class GetUsersByPhoneOrFIOQuery : IRequest<UserModelListModel>
{
    public string? FIO { get; set; }
    public string? Phone { get; set; }
}
using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;

public class GetUserBySigninDataQuery : IRequest<BikeShopUser>
{
    public string PhoneNumber { get; set; }
    public string Password { get; set; }
}
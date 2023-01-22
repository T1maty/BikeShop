using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;

public class GetUserByUsernameQuery : IRequest<BikeShopUser>
{
    public string PhoneNumber { get; set; }
}
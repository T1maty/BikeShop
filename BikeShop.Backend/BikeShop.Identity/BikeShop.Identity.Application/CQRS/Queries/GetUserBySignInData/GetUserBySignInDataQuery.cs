using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

public class GetUserBySignInDataQuery : IRequest<GetUserModel>
{
    public string Phone { get; set; }
    public string Password { get; set; }
}
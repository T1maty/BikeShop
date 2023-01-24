using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserById;

public class GetUserByIdQuery : IRequest<GetUserModel>
{
    public Guid UserId { get; set; }
}
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;

public class GetUserBySignInDataQueryHandler : IRequestHandler<GetUserBySigninDataQuery, BikeShopUser>
{
    //private readonly UserManager<BikeShopUser> _userManager;

    public GetUserBySignInDataQueryHandler(UserManager<BikeShopUser> userManager)
    {
        //_userManager = userManager;
    }

    public Task<BikeShopUser> Handle(GetUserBySigninDataQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
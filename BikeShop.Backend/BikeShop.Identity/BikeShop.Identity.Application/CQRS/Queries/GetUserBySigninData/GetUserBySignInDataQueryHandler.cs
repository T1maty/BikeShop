using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;

public class GetUserBySignInDataQueryHandler : IRequestHandler<GetUserBySigninDataQuery, BikeShopUser>
{
    private readonly UserManager<BikeShopUser> _userManager;

    public GetUserBySignInDataQueryHandler(UserManager<BikeShopUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<BikeShopUser> Handle(GetUserBySigninDataQuery request, CancellationToken cancellationToken)
    {
        // Ищу человека с таким номером телефона
        // Номер телефона без + в начале = username
        var user = await _userManager.FindByNameAsync(request.PhoneNumber.TrimStart('+'));

        // Если пользователь не найден - исключение
        if (user is null)
            throw new UserNotFoundException(request.PhoneNumber);

        // Возвращаю найденого пользователя
        return user;
    }
}
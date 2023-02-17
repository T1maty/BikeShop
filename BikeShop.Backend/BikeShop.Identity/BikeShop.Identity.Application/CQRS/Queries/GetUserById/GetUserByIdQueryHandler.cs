using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserById;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, GetUserModel>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public GetUserByIdQueryHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<GetUserModel> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        // Ищу пользователя по айди
        var user = await _userManager.FindByIdAsync(request.UserId.ToString());
        // Если не найден - ошибка
        if (user is null)
            throw new NotFoundException($"User with id '{request.UserId}' not found")
            {
                Error = "user_not_found",
                ErrorDescription = $"User with given id not found",
                ReasonField = "id"
            };

        // Получаю роли пользователя
        var roles = await _userManager.GetRolesAsync(user);

        return new GetUserModel
        {
            User = user,
            UserRoles = roles
        };
    }
}
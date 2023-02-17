using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

// Аутентифицировать и получить пользователя по логин данным (телефон/почта и пароль)
public class GetUserBySignInDataQueryHandler : IRequestHandler<GetUserBySignInDataQuery, GetUserModel>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public GetUserBySignInDataQueryHandler(UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<GetUserModel> Handle(GetUserBySignInDataQuery request, CancellationToken cancellationToken)
    {
        // Если не указан ни телефон ни почта - ошибка
        if (request.Phone is null && request.Email is null)
            throw new SignInDataException("Get user by sign in error. Phone AND email is null")
            {
                Error = "phone_email_null",
                ErrorDescription = "Get user error. Phone AND email are empty",
                ReasonField = "phone_email"
            };

        // Ищу пользователя в базе по телефону или почте, в зависимости от того что указали
        var user = request.Phone is not null
            ? await _userManager.FindByNameAsync(request.Phone)
            : await _userManager.FindByEmailAsync(request.Email);

        // Если нет такого пользователя
        if (user is null)
            throw new NotFoundException(
                $"Get user by sign in error. User with phone/email {request.Phone ?? request.Email} not found")
            {
                Error = "user_not_found",
                ErrorDescription = "Get user error. User with given phone/email not found",
                ReasonField = request.Phone is null ? "email" : "phone"
            };

        // Сверяю пароль
        var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
        if (!result.Succeeded)
            throw new SignInDataException($"Get user by sign in error. Incorrect password from user {user.PhoneNumber}")
            {
                Error = "incorrect_password",
                ErrorDescription = "Get user error. Incorrect password",
                ReasonField = "password"
            };


        // Подтягиваю его роли
        var roles = await _userManager.GetRolesAsync(user);

        // Возвращаю юзера и его роли
        return new GetUserModel
        {
            User = user,
            UserRoles = roles
        };
    }
}
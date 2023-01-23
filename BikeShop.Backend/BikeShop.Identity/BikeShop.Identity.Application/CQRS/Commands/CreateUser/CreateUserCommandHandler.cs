using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    private readonly UserManager<BikeShopUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    private const string UserRole = "user";

    public CreateUserCommandHandler(UserManager<BikeShopUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Проверка - есть ли пользователь с таким номером телефона
        var username = request.PhoneNumber.TrimStart('+');
        var existingUser = await _userManager.FindByNameAsync(username);
        if (existingUser is not null)
            throw new RegistrationException
            {
                Error = "phone_exists",
                ErrorDescription = $"User with given phone number already exists"
            };

        // Если нету еще такого телефона
        // Формирую нового пользователя из запроса 
        var user = new BikeShopUser
        {
            UserName = request.PhoneNumber.TrimStart('+'),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            Email = request.Email,
            ShopId = request.ShopId,
            PhoneNumber = request.PhoneNumber
        };

        // Пытаюсь создать пользователя в базе
        var result = await _userManager.CreateAsync(user, request.Password);

        // Если проблема
        if (!result.Succeeded)
            throw new RegistrationException
            {
                Error = "invalid_signup_data",
                ErrorDescription = "Invalid sign up data. Might be simple password"
            };

        // Выдача роли юзера
        var userRoleExists = await _roleManager.RoleExistsAsync(UserRole);

        if (!userRoleExists)
            await _roleManager.CreateAsync(new IdentityRole(UserRole));

        await _userManager.AddToRoleAsync(user, UserRole);

        return Unit.Value;
    }
}
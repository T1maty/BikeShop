using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    private readonly UserManager<BikeShopUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    private string _userRole = "user";

    public CreateUserCommandHandler(UserManager<BikeShopUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
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
        // для результата создания роли
        IdentityResult identityResult;

        // Если проблема
        if (!result.Succeeded)
            throw new RegistrationException();

        var userRoleExists = await _roleManager.RoleExistsAsync(_userRole);

        if (!userRoleExists)
            identityResult = await _roleManager.CreateAsync(new IdentityRole(_userRole));

        await _userManager.AddToRoleAsync(user, _userRole);

        return Unit.Value;
    }
}
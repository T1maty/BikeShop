using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Создаю пользователя из запроса
        var user = new ApplicationUser
        {
            UserName = request.Phone,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            ShopId = request.ShopId,
            PhoneNumber = request.Phone
        };

        // Добавляю пользователя в бд
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            throw new RegistrationException($"Error while user '{request.Phone}' registration")
            {
                Error = "error_registration",
                ErrorDescription = "Registration error. Perhaps the password does not match the requirements"
            };

        // Даю стандартную роль пользователю
        await _userManager.AddToRoleAsync(user, "user");

        return Guid.Parse(user.Id);
    }
}
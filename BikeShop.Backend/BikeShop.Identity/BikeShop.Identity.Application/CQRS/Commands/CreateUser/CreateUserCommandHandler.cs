using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateUser;

// Создать пользователя / регистрация
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Если есть пользователь с таким телефоном - ошибка
        var existingUserByPhone = await _userManager.FindByNameAsync(request.Phone);
        if (existingUserByPhone is not null)
            throw new RegistrationException($"Registration error. User with phone {request.Phone} already exists")
            {
                Error = "phone_already_exists",
                ErrorDescription = "Registration error. User with given phone already exists"
            };


        // Создаю пользователя из запроса
        var user = new ApplicationUser
        {
            UserName = request.Phone,
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
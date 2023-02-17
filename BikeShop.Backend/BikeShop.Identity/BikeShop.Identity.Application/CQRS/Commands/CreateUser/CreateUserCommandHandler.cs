using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateUser;

// Создать пользователя / регистрация
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private static Random _random = new Random();

    public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Если есть пользователь с таким телефоном - ошибка
        var existingUserByPhone = await _userManager.FindByNameAsync(request.Phone);
        if (existingUserByPhone is not null)
            throw new AlreadyExistsException($"Create user error. User with phone {request.Phone} already exists")
            {
                Error = "phone_already_exists",
                ErrorDescription = "Create user error. User with given phone already exists",
                ReasonField = "phone"
            };


        // Создаю пользователя из запроса
        var user = new ApplicationUser
        {
            UserName = request.Phone,
            PhoneNumber = request.Phone,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic
        };

        // Если пароль не был указан - генерирую рандомный
        request.Password ??= RandomString(8);

        // Добавляю пользователя в бд
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)

            throw new RegistrationException($"Error while user '{request.Phone}' registration")
            {
                
                
                
                
                Error = "error_registration",
                ErrorDescription = "Registration error. Perhaps the password does not match the requirements",
                ReasonField = "password"
            };

        // Даю стандартную роль пользователю
        await _userManager.AddToRoleAsync(user, "user");

        return Guid.Parse(user.Id);
    }
    
    private static string RandomString(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[_random.Next(s.Length)]).ToArray());
    }
}
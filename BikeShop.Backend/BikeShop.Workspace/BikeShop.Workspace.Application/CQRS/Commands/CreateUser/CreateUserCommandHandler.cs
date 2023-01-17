using BikeShop.Workspace.Application.Common.Configurations;
using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Application.Services;
using BikeShop.Workspace.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Commands.CreateUser;

// Создание нового пользователя в базе, автоматически выдает стандартную роль user
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly UserService _userService;
    private readonly RoleConfiguration _roleConfiguration;

    public CreateUserCommandHandler(IApplicationDbContext context, UserService userService,
    RoleConfiguration roleConfiguration)
    {
        _context = context;
        _userService = userService;
        _roleConfiguration = roleConfiguration;
    }

    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Ищем пользователя с таким email адресом. Если такой есть - exception
        var user = _userService.GetUserByEmail(request.Email, cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(User), request.Email);

        // Получаю стандартную роль user, выдаваемую новым пользователям
        var defaultUserRole = await _context.UserRoles
            .FirstOrDefaultAsync(role => role.Name == _roleConfiguration.UserRole,
                cancellationToken);

        // Если такой роли нету, исключение. (Хотя роль создается в DbInitializer)
        if (defaultUserRole is null)
            throw new NotFoundException(nameof(UserRole), _roleConfiguration.UserRole);


        // Создаю нового пользователя на основе входных данных в комманде
        // выдаю ему стандартную роль
        var newUser = new User()
        {
            Email = request.Email,
            Password = request.Password,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            Phone = request.Phone,
            RoleId = defaultUserRole.Id,
        };

        // Добавляю пользователя в базу и сохраняю
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync(cancellationToken);

        // Возвращаю id нового пользователя
        return newUser.Id;
    }
}
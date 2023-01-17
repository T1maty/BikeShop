using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.CreateUser;

// Создание нового пользователя в базе, автоматически выдает стандартную роль user
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    private readonly IRepository<User> _usersRepository;
    private readonly IRepository<UserRole> _userRolesRepository;

    public CreateUserCommandHandler(IRepository<User> usersRepository, IRepository<UserRole> userRolesRepository)
    {
        _usersRepository = usersRepository;
        _userRolesRepository = userRolesRepository;
    }

    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Ищем пользователя с таким email адресом. Если такой есть - exception
        return 0;
    }
}
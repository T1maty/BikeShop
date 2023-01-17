using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Application.Services;
using BikeShop.Workspace.Domain.Entities;
using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.CreateUser;

// Создание нового пользователя в базе, автоматически выдает стандартную роль user
public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly UserService _userService;

    public CreateUserCommandHandler(IApplicationDbContext context, UserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // Ищем пользователя с таким email адресом. Если такой есть - exception
        return 0;
    }
}
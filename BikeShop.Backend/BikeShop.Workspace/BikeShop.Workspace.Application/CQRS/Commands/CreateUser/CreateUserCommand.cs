using MediatR;
using static System.String;

namespace BikeShop.Workspace.Application.CQRS.Commands.CreateUser;

// Команда на добавление нового пользователя в базу, возвращает id пользователя
public class CreateUserCommand : IRequest<int>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }

    public string? Phone { get; set; }

    public string Email { get; set; } = Empty;
    public string Password { get; set; } = Empty;
}
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.UpdateUserPublic;

// Обновить публичную информацию о пользователе
public class UpdateUserPublicCommand : IRequest
{
    public string UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public string? Email { get; set; }
}
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateUser;

public class CreateUserCommand : IRequest<Guid>
{
    public string Phone { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    // public int ShopId { get; set; }
}
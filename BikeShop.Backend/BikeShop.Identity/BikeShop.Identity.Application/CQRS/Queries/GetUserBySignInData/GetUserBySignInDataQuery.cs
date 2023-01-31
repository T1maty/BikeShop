using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

// Аутентифицировать и получить пользователя по логин данным (телефон/почта и пароль)
public class GetUserBySignInDataQuery : IRequest<GetUserModel>
{
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string Password { get; set; }
}
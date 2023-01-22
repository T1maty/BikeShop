using System.Numerics;
using MediatR;

namespace BikeShop.Identity.Application.CQRS.Commands.CreateRefreshSession;

public class CreateRefreshSessionCommand : IRequest
{
    public Guid UserId { get; set; } // Айди пользователя, который залогинился
    public string RefreshToken { get; set; } // Единственно валидный ожидаемый рефреш токен
    public string Fingerprint { get; set; } // Например айди браузера, с которого зашли
    public BigInteger ExpiresIn { get; set; } // Время истечения сессии
}
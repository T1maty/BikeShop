using System.Numerics;

namespace BikeShop.Identity.Domain.Entities;

public class RefreshSession : BaseEntity
{
    public Guid UserId { get; set; } // Айди пользователя, который залогинился
    public string RefreshToken { get; set; } // Единственно валидный ожидаемый рефреш токен
    public string Fingerprint { get; set; } // Например айди браузера, с которого зашли
    public int? ExpiresIn { get; set; } // Время истечения сессии
}
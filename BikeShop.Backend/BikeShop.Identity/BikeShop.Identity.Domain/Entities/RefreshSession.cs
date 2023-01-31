namespace BikeShop.Identity.Domain.Entities;

// Текущая активная сессия
public class RefreshSession : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid RefreshToken { get; set; }
}
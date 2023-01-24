namespace BikeShop.Identity.Domain.Entities;

public class RefreshSession : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid RefreshToken { get; set; }
}
using System.Text.Json.Serialization;

namespace BikeShop.Service.Domain.Entities;

// Работа, которая применялась при ремонте
public class ServiceWork : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Quantity { get; set; } = 0;
    public int QuantityUnitId { get; set; } = 1;
    public decimal Price { get; set; } = 0;
    public decimal Discount { get; set; } = 0;
    public decimal Total { get; set; } = 0;
    public Guid? UserId { get; set; }

    public int ServiceId { get; set; } = 0;
    [JsonIgnore] public Service Service { get; set; }

    [JsonIgnore] public Work Work { get; set; }
}
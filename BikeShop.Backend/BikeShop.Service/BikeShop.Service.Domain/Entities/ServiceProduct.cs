using System.Text.Json.Serialization;

namespace BikeShop.Service.Domain.Entities;

// Продукты, которые использовались при ремонте
public class ServiceProduct : BaseEntity
{
    public string CatalogKey { get; set; } = string.Empty;
    public string SerialNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int QuantityUnitId { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }
    public Guid UserId { get; set; }

    public int ServiceId { get; set; }
    [JsonIgnore] public Service Service { get; set; }

    public int WorkId { get; set; }
    [JsonIgnore] public Work Work { get; set; }
}
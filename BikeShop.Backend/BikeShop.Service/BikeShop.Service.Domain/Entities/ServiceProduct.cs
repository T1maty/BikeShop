using System.Text.Json.Serialization;

namespace BikeShop.Service.Domain.Entities;

// Продукты, которые использовались при ремонте
public class ServiceProduct : BaseEntity
{
    public int ProductId { get; set; }
    public string CatalogKey { get; set; } = string.Empty;
    public string SerialNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Quantity { get; set; } = 0;
    public int QuantityUnitId { get; set; } = 0;
    public string QuantityUnitName { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0;
    public decimal Discount { get; set; } = 0;
    public decimal Total { get; set; } = 0;
    public Guid? UserId { get; set; } 

    public int ServiceId { get; set; } = 0;
}
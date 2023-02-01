namespace BikeShop.Service.Domain.Entities;

public class ServiceProduct : BaseEntity
{
    public int WorkId { get; set; }
    public Work Work { get; set; }
    
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
    public Service Service { get; set; }
}
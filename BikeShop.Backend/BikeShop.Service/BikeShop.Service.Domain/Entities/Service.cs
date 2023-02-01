namespace BikeShop.Service.Domain.Entities;

public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int ClientId { get; set; }
    public string ClientDescription { get; set; } = string.Empty;
    public int UserCreatedId { get; set; }
    public int UserMasterId { get; set; }

    public string PriceWork { get; set; } = string.Empty; // ?
    public string DiscountWork { get; set; } = string.Empty; // ?
    public string TotalWork { get; set; } = string.Empty; // ?
    public string PriceService { get; set; } = string.Empty; // ?
    public string DiscountService { get; set; } = string.Empty; // ?
    public string TotalService { get; set; } = string.Empty; // ?

    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }

    public bool UserDeleted { get; set; } // ?
}
using BikeShop.Payments.Domain.Entities;
using System.Text.Json.Serialization;

namespace BikeShop.Products.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string CatalogKey { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Barcode { get; set; } = string.Empty;
    public string? ManufacturerBarcode { get; set; }
    public int QuantityUnitId { get; set; }

    public decimal IncomePrice { get; set; }
    public decimal DealerPrice { get; set; }
    public decimal RetailPrice { get; set; }

    public int BrandId { get; set; }

    public string CheckStatus { get; set; } = string.Empty;
    public bool RetailVisibility { get; set; }
    public bool B2BVisibility { get; set; }
    
}
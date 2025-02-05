using System.Text.Json.Serialization;

namespace BikeShop.Products.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string CatalogKey { get; set; } = string.Empty;
    public string CategoryImport { get; set; } = string.Empty;
    public int CategoryId { get; set; } = 0;
    public string CategoryName { get; set; } = string.Empty;
    public string CategoryWay { get; set; } = string.Empty;
    public string Barcode { get; set; } = string.Empty;
    public string ManufacturerBarcode { get; set; } = string.Empty;
    public int QuantityUnitId { get; set; } = 1;
    public string QuantityUnitName { get; set; }

    public decimal IncomePrice { get; set; }
    public decimal DealerPrice { get; set; }
    public decimal RetailPrice { get; set; }

    public decimal OldIncomePrice { get; set; }
    public decimal OldDealerPrice { get; set; }

    public bool IsMaster { get; set; } = true;

    public int BrandId { get; set; } = 1;
    [JsonIgnore] public Brand Brand { get; set; }

    public string CheckStatus { get; set; } = "JustCreatedByUser";
    public bool RetailVisibility { get; set; } = false;
    public bool B2BVisibility { get; set; } = false;

    public Guid UserCreated { get; set; }
    public Guid UserUpdated { get; set; }
}
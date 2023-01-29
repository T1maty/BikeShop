using System.Text.Json.Serialization;

namespace BikeShop.Workspace.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string CatalogKey { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Barcode { get; set; } = string.Empty;

        public decimal IncomePrice { get; set; }
        public decimal DealerPrice { get; set; }
        public decimal RetailPrice { get; set; }

        public int BrandId { get; set; }
        [JsonIgnore] public Brand Brand { get; set; }

        public string CheckStatus { get; set; }
        public bool CheckVisibility { get; set; }
    }
}
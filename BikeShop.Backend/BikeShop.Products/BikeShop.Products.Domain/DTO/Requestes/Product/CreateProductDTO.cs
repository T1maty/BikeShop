using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Product
{
    public class CreateProductDTO
    {
        public string Name { get; set; } = string.Empty;
        public string CatalogKey { get; set; } = string.Empty;
        public string? Category { get; set; } = string.Empty;
        public string? ManufacturerBarcode { get; set; } = string.Empty;
        public bool RetailVisibility { get; set; } = false;
        public bool B2BVisibility { get; set; } = false;
        public int? QuantityUnitId { get; set; } = 0;
        public decimal IncomePrice { get; set; }
        public decimal DealerPrice { get; set; }
        public decimal RetailPrice { get; set; }
        public Guid User { get; set; }
        public int? TagId { get; set; } = 0;
    }
}

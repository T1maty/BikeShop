using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Update
{
    public class ProductSupplyInvoiceUpdDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } = string.Empty;
        public string CatalogKey { get; set; }
        public string Barcode { get; set; }
        public string ManufBarcode { get; set; }
        public string QuantityUnitName { get; set; }
        public decimal IncomePrice { get; set; }
        public string? BrandName { get; set; } = "NoBrand";
        public decimal Quantity { get; set; }
    }
}

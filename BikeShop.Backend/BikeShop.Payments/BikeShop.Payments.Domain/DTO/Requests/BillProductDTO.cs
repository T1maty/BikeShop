using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class BillProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string CatalogKey { get; set; }
        public string SerialNumber { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public string QuantityUnitName { get; set; } = string.Empty;
        public string CurrencySymbol { get; set; } = string.Empty;
        public int CurrencyId { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
    }
}

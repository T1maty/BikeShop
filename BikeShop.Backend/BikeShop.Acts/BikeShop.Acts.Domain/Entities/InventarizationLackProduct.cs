using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class InventarizationLackProduct : BaseEntity
    {
        public int InventariazationLackId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CatalogKey { get; set; }
        public string Barcode { get; set; }
        public string ManufBarcode { get; set; }
        public string QuantityUnitName { get; set; }
        public decimal IncomePrice { get; set; }
        public decimal DealerPrice { get; set; }
        public decimal RetailPrice { get; set; }

        public decimal Quantity { get; set; }
        public decimal IncomeTotal { get; set; }
        public decimal DealerTotal { get; set; }
        public decimal RetailTotal { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.ProductMove
{
    public class ProductMoveProductDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CatalogKey { get; set; }
        public string Barcode { get; set; }
        public string ManufacturerBarcode { get; set; }
        public string QuantityUnitName { get; set; }
        public decimal Quantity { get; set; }
    }
}

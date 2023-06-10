using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class CreateOrderProductDTO
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public string CatalogKey { get; set; }
        public string SerialNumber { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int QuantityUnitId { get; set; }
        public string QuantityUnitName { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
    }
}

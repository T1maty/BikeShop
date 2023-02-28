using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductReservation : BaseEntity
    {
        public int ProductId { get; set; }
        public int StorageId { get; set; }
        public decimal Quantity { get; set; }
    }
}

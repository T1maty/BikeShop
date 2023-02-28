using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductStoragesTtansition : BaseEntity
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }

        public int MovingFromSkladId { get; set; }
        public int MovingToSkladId { get; set; }
        public string PSTStatus { get; set; } = "Created";
    }
}

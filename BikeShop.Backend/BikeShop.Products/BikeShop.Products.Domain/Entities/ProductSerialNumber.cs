using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductSerialNumber : BaseEntity
    {
        public int ProductId { get; set; }
        public string SerialNumber { get; set; }
    }
}

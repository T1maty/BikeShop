using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class ProductStorageQuantity
    {
        public int ProductId { get; set; }
        public decimal Available { get; set; }
        public decimal Reserved { get; set; }
    }
}

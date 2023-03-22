using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class ProductOptionsDTO
    {
        public int id { get; set; }
        public List<int> variantIds { get; set; }
    }
}

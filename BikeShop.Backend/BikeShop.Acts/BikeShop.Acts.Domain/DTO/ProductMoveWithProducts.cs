using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO
{
    public class ProductMoveWithProducts
    {
        public ProductMove ProductMove { get; set; }
        public List<ProductMoveProduct> Products { get; set; }
    }
}

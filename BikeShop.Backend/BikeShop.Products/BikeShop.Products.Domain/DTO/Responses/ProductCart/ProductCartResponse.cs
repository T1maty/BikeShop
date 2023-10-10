using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses.ProductCart
{
    public class ProductCartResponse
    {
        public ProductCardDTO Product { get; set; }
        public decimal Quantity { get; set; }
    }
}

using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class ProductQuantityDTO
    {
        public Product Product { get; set; }
        public decimal Quantity { get; set; }
        public QuantityUnit QuantityUnit { get; set; }
    }
}

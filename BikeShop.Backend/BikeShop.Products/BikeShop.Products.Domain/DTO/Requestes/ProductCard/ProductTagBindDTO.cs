using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class ProductTagBindDTO
    {
        public int ProductId { get; set; }
        public ProductTag ProductTag { get; set; }
    }
}

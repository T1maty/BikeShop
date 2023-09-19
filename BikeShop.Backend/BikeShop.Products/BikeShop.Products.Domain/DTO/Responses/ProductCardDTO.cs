using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class ProductCardDTO
    {
        public Product product { get; set; }
        public ProductCard? productCard { get; set; }
        public List<ProductOptionVariantBind> productOptions { get; set; }
        public List<ProductImg> productImages { get; set; }
        public ProductCategory? productCategory { get; set; }
        public List<Product> bindedProducts { get; set; }
        public Dictionary<int, Dictionary<int, decimal>> ProductStorageQuantity { get; set; }
        public Dictionary<int, Dictionary<int, decimal>> ProductStorageReserved { get; set; }
    }
}

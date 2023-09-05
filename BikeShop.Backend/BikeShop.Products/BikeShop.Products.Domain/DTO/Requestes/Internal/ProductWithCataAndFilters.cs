using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Internal
{
    public class ProductWithCataAndFilters
    {
        public Entities.Product Product { get; set; }
        public ProductCategory? category { get; set; }
        public List<ProductOptionVariantBind> filters { get; set; }
    }
}

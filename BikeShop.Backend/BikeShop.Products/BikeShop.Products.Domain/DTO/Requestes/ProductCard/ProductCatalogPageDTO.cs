using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class ProductCatalogPageDTO
    {
        public List<ProductCardDTO> Products { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public int TotalPages { get; set; }
        public int StorageId { get; set; }

        public List<ProductOptionVariantBind> Options { get; set; } 
        public List<string> SortingSettings { get; set; }
    }
}

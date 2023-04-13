using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class OptionVariantDTO
    {
        public int id { get; set; }
        public int productId { get; set; }
        public bool enabled { get; set; }
        public int OptionVariantId { get; set; }
        public int SortOrder { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class ProductSpecidicationDTO
    {
        public int id { get; set; }
        public int SpecificationId { get; set; }
        public int SortOrder { get; set; }
        public string Description { get; set; }
        public bool Enabled { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductSpecification : BaseEntity
    {
        public int ProductId { get; set; }
        public int SpecificationId { get; set; }
        public int SortOrder { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
}

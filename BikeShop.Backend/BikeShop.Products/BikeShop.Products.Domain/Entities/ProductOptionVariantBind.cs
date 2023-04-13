using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductOptionVariantBind : BaseEntity
    {
        public int OptionVariantId { get; set; }
        public int OptionId { get; set; }
        public int ProductId { get; set; }
        public int SortOrder { get; set;}
        public string Name { get; set; }
        public string OptionName { get; set; }
    }
}

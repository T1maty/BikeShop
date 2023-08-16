using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Way { get; set; }
        public int ParentId { get; set; }
        public bool IsCollapsed { get; set; }
        public bool IsRetailVisible { get; set; }
        public bool IsB2BVisible { get; set; }
        public int SortOrder { get; set; }
    }
}

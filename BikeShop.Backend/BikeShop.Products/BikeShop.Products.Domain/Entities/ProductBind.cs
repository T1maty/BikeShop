using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductBind : BaseEntity
    {
        public int ProductId { get; set; }
        public int ChildrenId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class TagToCategoryBind : BaseEntity
    {
        public int TagId { get; set; } = 0;
        public string TagName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
    }
}

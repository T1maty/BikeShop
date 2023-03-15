using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class OptionVariant: BaseEntity
    {
        public int OptionId { get; set; }
        public string Name { get; set; }
        public string OptionName { get; set; }
    }
}

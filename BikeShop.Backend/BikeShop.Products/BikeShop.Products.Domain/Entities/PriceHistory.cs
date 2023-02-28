using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class PriceHistory : BaseEntity
    {
        public int ProductId { get; set; }

        public decimal OldPrice { get; set; }
        public string OldPriceCurrency { get; set; }

        public decimal NewPrice { get; set; }
        public string NewPriceCurrency { get; set; }

        public Guid UserChangedId { get; set; }
    }
}

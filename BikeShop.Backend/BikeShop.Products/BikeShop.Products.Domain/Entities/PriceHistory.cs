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

        public decimal OldIncomePrice { get; set; }
        public decimal NewIncomePrice { get; set; }

        public decimal OldRetailPrice { get; set; }
        public decimal NewRetailPrice { get; set; }

        public decimal OldDealerPrice { get; set; }
        public decimal NewDealerPrice { get; set; }

        public Guid UserChangedId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Entities
{
    public class DiscountProductBind : BaseEntity
    {
        public int DiscountId { get; set; }
        public int ProductId { get; set; }
        public string TypeOnly { get; set; }
        public decimal AmountLimit { get; set; }
        public decimal TotalLimit { get; set; }
    }
}

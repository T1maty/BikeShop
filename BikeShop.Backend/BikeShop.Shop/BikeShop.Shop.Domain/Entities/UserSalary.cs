using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Entities
{
    public class UserSalary : BaseEntity
    {
        public Guid UserId { get; set; }

        public decimal Rate { get; set; }
        public decimal ShopPercent { get; set; }
        public decimal WorkPercent { get; set; }
        public decimal WorkshopPercent { get; set; }
    }
}

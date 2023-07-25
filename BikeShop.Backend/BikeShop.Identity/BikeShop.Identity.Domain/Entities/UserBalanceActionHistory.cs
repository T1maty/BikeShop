using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.Entities
{
    public class UserBalanceActionHistory : BaseEntity
    {
        public decimal ActionAmount { get; set; }
        public Guid UserId { get; set; }
        public decimal BeforeAction { get; set; }
        public decimal AfterAction { get; set; }
    }
}

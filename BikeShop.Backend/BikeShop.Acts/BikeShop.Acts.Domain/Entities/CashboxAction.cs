using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class CashboxAction:BaseEntity
    {
        public int ShopId { get; set; }
        public Guid UserCreated { get; set; }
        public Guid UserUpdated { get; set; }
        public decimal Cash { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}

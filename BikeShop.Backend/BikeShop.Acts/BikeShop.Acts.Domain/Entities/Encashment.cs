using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class Encashment : BaseEntity
    {
        public int ShopId { get; set; }
        public Guid UserCreated { get; set; }
        public Guid UserUpdated { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime Time { get; set; } = DateTime.Now;
        public decimal Cash { get; set; }
        public decimal CashRemain { get; set; }
        public decimal Card { get; set; }
        public string Status { get; set; }
    }
}

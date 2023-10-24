using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Entities
{
    public class Payment : BaseEntity
    {
        public string Target { get; set; }
        public int TargetId { get; set; }
        public string Source { get; set; }
        public string Type { get; set; }

        public decimal Total { get; set; }
        public int CurrencyId { get; set; }
        public decimal TotalInCurrency { get; set; }

        public Guid? UserId { get; set; }
        public Guid? ClientId { get; set; }
        public int? ShopId { get; set; }
    }
}

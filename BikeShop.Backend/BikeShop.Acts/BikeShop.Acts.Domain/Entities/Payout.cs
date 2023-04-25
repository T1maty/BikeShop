using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class Payout : BaseEntity
    {
        public Guid TargetUserId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Source { get; set; }
        public int SourceId { get; set; }
    }
}

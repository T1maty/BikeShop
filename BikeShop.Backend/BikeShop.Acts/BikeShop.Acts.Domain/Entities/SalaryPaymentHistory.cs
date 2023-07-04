using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class SalaryPaymentHistory : BaseEntity
    {
        public Guid UserId { get; set; }
        public decimal Total { get; set; }
        public DateTime Time { get; set; }
    }
}

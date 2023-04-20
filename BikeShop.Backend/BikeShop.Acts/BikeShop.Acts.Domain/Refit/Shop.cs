using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit
{
    public class Shop : BaseEntity
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Secret { get; set; }
        public int StorageId { get; set; }
        public decimal CashboxCash { get; set; }
        public decimal CashboxTerminal { get; set; }
    }
}

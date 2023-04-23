using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class CreatePayment
    {
        public string Target { get; set; }
        public int TargetId { get; set; }

        public decimal Cash { get; set; }
        public decimal BankCount { get; set; }
        public decimal Card { get; set; }
        public decimal PersonalBalance { get; set; }
        public int CurrencyId { get; set; }

        public Guid UserId { get; set; }
        public Guid ClientId { get; set; }
        public int ShopId { get; set; }
    }
}

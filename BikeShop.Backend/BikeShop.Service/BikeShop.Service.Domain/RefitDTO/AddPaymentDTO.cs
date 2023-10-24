using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Payment
{
    public class AddPaymentDTO
    {
        public decimal Amount { get; set; }
        public int CurrencyId { get; set; }
        public string PaymentType { get; set; }
        public bool IsFiscal { get; set; }
    }
}

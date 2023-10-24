using BikeShop.Payments.Domain.DTO.Requests.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Domain.RefitDTO
{
    public class CreatePayment
    {
        public AddPaymentDTO Payment { get; set; }

        public string Target { get; set; }
        public int TargetId { get; set; }
        public string Source { get; set; }

        public Guid? UserId { get; set; }
        public Guid? ClientId { get; set; }
        public int? ShopId { get; set; }
    }
}

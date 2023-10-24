using BikeShop.Payments.Domain.DTO.Requests.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class AddOrderPaymentDTO
    {
        public Guid? UserId { get; set; }
        public Guid? ClientId { get; set; }
        public int OrderId { get; set; }
        public AddPaymentDTO Payment { get; set; }
    }
}

using BikeShop.Payments.Domain.DTO.Requests.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class ReplenishUserBalanceDTO
    {
        public AddPaymentDTO Payment { get; set; }
        public Guid ClientId { get; set; }
        public Guid UserId { get; set; }
        public int ShopId { get; set; }
}
}

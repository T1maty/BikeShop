using BikeShop.Payments.Domain.DTO.Requests.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Domain.DTO
{
    public class ServiceEndDTO
    {
        public AddPaymentDTO Payment { get; set; }
        public int ServiceId { get; set; }
        public Guid UserId { get; set; }
    }
}

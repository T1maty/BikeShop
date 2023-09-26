using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class OrderCreationDTO
    {
        public string DeliveryType { get; set; }
        public string DeliveryInfo { get; set; }

        public string DescriptionCilent { get; set; }
        public int DiscountId { get; set; }
        public Guid ClientId { get; set; }

    }
}

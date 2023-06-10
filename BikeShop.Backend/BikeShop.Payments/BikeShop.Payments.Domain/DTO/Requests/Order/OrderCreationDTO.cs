using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class OrderCreationDTO
    {
        public int ShopId { get; set; }
        public string DeliveryType { get; set; }
        public string DeliveryInfo { get; set; }
        public string DescriptionUser { get; set; }
        public int DiscountId { get; set; }

        public Guid? ClientId { get; set; }
        public string ClientPhone { get; set; }
        public string ClientFIO { get; set; }
        public string ClientEmail { get; set; }

    }
}

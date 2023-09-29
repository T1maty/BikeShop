using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class InternalCreateOrderDTO
    {
        public List<CreateOrderProductDTO> Products { get; set; }

        public int ShopId { get; set; }
        public string DeliveryType { get; set; }
        public string DeliveryInfo { get; set; }
        public string DescriptionCilent { get; set; }

        public int DiscountId { get; set; }

        public bool IsPrePay { get; set; } = true;
        public Guid ClientId { get; set; }
        public Guid UserId { get; set; }
        public Guid ManagerId { get; set; }
    }
}

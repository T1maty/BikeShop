using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Entities
{
    public class Order : BaseEntity
    {
        public int ShopId { get; set; }
        public string OrderType { get; set; }
        public string DeliveryType { get; set; }
        public string DeliveryInfo { get; set; }
        public string OrderStatus { get; set; }
        public bool IsPayed { get; set; }
        public string Description { get; set; }
        public string DescriptionUser { get; set; }

        public int DiscountId { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal TotalPrice { get; set; }

        public Guid? ClientId { get; set; }
        public string ClientPhone { get; set; }
        public string ClientFIO { get; set; }
        public string ClientEmail { get; set; }

        public Guid? UserId { get; set; }
        public string UserFIO { get; set; }
    }
}

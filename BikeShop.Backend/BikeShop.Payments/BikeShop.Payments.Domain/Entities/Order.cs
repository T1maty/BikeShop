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
        public string OrderStatus { get; set; }
        public string DeliveryType { get; set; }
        public string DeliveryInfo { get; set; }

        public bool IsPayed { get; set; } = false;
        public int PaymentId { get; set; }

        public string DescriptionCilent { get; set; }

        public int DiscountId { get; set; }

        public bool IsPrePay { get; set; } = true;

        public decimal OrderDiscount { get; set; }
        public decimal TotalProductDiscount { get; set; }
        public decimal TotalProductsPrice { get; set; }
        public decimal TotalPrice { get; set; }

        public Guid ClientId { get; set; }
        public Guid? UserCreated { get; set; } = null;
        public Guid? UserUpdated { get; set; } = null;
        public Guid? ManagerId { get; set; } = null;
    }
}

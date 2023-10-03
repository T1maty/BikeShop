using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Entities
{
    public class OrderStatusHistory : BaseEntity
    {
        public int OrderId { get; set; }
        public string OrderStatus { get; set; }
        public string? PreviousOrderStatus { get; set; }
        public Guid UserId { get; set; }
        public string UserFIO { get; set; }
    }
}

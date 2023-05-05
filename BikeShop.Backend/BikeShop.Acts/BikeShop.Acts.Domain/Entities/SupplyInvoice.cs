using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class SupplyInvoice : BaseEntity
    {
        public int ShopId { get; set; }
        public Guid UserCreatedId { get; set; }
        public Guid UserUpdatedId { get; set;}
        public string SypplyActStatus { get; set; }
        public string Description { get; set; } = string.Empty;

        public decimal DeliveryPrice { get; set; } 
        public decimal AdditionalPrice { get; set; } 
        public decimal Total { get; set; } = 0;
    }
}

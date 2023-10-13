using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit.Service
{
    public class ServiceWorkDTO : BaseEntity
    {
        public int WorkId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 0;
        public decimal Price { get; set; } = 0;
        public decimal Discount { get; set; } = 0;
        public decimal ComplicationPrice { get; set; } = 0;
        public decimal Total { get; set; } = 0;
        public Guid? UserId { get; set; }

        public int ServiceId { get; set; } = 0;
    }
}

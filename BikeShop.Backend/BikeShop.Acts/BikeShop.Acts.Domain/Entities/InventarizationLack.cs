using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class InventarizationLack : BaseEntity
    {
        public int ShopId { get; set; }
        public int InventarizationId { get; set; }
        public Guid UserCreatedId { get; set; }
        public Guid UserUpdatedId { get; set; }
        public string Description { get; set; }
    }
}

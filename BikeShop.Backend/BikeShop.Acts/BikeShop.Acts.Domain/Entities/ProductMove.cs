using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class ProductMove : BaseEntity
    {
        public int MovingFromSkladId { get; set; }
        public int MovingToSkladId { get; set; }

        public string Description { get; set; }
        public string Status { get; set; }

        public Guid UserCreated { get; set; }
        public Guid UserUpdated { get; set; }
    }
}

using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class OutcomeAct : BaseEntity
    {
        public int ShopId { get; set; }

        public Guid UserCreatedId { get; set; }
        public string UserCreatedFIO { get; set; }


        public Guid UserUpdatedId { get; set; }
        public string UserUpdatedFIO { get; set; }


        public string OutcomeActStatus { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}

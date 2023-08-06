using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO
{
    public class OutcomeActWithProducts
    {
        public OutcomeAct OutcomeAct { get; set; }
        public List<OutcomeActProduct> Products { get; set; }
    }
}

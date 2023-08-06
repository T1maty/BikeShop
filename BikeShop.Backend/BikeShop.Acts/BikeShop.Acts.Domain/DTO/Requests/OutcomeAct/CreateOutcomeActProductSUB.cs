using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.OutcomeAct
{
    public class CreateOutcomeActProductSUB
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
        public string Description { get; set; }
    }
}

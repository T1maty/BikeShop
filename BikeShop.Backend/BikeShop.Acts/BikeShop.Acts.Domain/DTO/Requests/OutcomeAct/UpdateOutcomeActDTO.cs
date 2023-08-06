using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.OutcomeAct
{
    public class UpdateOutcomeActDTO
    {
        public List<UpdateOutcomeActProductSUB> Products { get; set; }
        public UpdateOutcomeActSUB OutcomeAct { get; set; }
    }
}

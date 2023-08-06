using BikeShop.Acts.Domain.Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.OutcomeAct
{
    public class CreateOutcomeActDTO
    {
        public List<CreateOutcomeActProductSUB> Products { get; set; }
        public CreateOutcomeActSUB OutcomeAct { get; set; }

    }
}

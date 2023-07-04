using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.Payout
{
    public class SalaryPayoutDTO
    {
        public Guid User { get; set; }
        public string Description { get; set; }
    }
}

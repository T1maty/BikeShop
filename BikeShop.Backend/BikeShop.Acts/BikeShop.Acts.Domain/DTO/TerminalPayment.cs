using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO
{
    public class TerminalPayment
    {
        public Guid Id { get; set; }
        public int AgentId { get; set; }
        public decimal Amount { get; set; }
    }
}

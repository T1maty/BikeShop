using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.AgentHub
{
    public class StartPrintDTO
    {
        public int AgentId{ get; set; }
        public int DataId { get; set; }
        public int? Copies { get; set; } = 1;
        public int? CurrencyId { get; set; }
    }
}

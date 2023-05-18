using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class PrintQueue : BaseEntity
    {
        public string DataURL { get; set; }
        public string DataName { get; set; }
        public string PrintSettings { get; set; }
        public int AgentId { get; set; }
        public int Priority { get; set; } = 100;
    }
}

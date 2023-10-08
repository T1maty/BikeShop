using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.AgentHub
{
    public class PrintDTO
    {
        public int AgentId { get; set; }
        public string HTML { get; set; }
        public Domain.DTO.PrinterSettings PrintSettings { get; set; }
    }
}

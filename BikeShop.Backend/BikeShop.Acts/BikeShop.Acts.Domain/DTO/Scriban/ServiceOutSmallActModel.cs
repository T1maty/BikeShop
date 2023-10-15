using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class ServiceOutSmallActModel
    {
        public string ClientFIO { get; set; }
        public string ClientPhone { get; set; }
        public int Id { get; set; }
        public string Date { get; set; }
        public string Bike { get; set; }
        public string ManagerFIO { get; set; }
    }
}

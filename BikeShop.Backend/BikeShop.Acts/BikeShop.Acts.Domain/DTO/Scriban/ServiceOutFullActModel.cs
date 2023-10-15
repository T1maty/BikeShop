using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class ServiceOutFullActModel
    {
        public string ClientFIO { get; set; }
        public string ClientPhone { get; set; }
        public int Id { get; set; }
        public string Date { get; set; }
        public string Bike { get; set; }
        public string ManagerFIO { get; set; }

        public string WithoutDiscWorks { get; set; }
        public string DiscWorks { get; set; }
        public string TotalWorks { get; set; }

        public string WithoutDiscProducts { get; set; }
        public string DiscProducts { get; set; }
        public string TotalProducts { get; set; }

        public string CurSymbol { get; set; }
        public string TotalService { get; set; }
        public List<ServiceProductModel> Products { get; set; }
        public List<ServiceWorkModel> Works { get; set; }
    }
}

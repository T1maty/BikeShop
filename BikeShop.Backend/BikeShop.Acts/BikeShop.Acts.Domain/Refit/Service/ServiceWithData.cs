using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit.Service
{
    public class ServiceWithData
    {
        public ServiceDTO service { get; set; }
        public List<ServiceProductDTO> products { get; set; }
        public List<ServiceWorkDTO> works { get; set; }
    }
}

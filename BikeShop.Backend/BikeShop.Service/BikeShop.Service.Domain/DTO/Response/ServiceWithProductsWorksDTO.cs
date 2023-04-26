using BikeShop.Service.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Domain.DTO.Response
{
    public class ServiceWithProductsWorksDTO
    {
        public Domain.Entities.Service Service { get; set; }
        public List<ServiceProduct> Products { get; set; }
        public List<ServiceWork> Works { get; set; }
    }
}

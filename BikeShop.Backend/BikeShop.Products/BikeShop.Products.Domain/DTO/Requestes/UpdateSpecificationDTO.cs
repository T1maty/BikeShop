using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes
{
    public class UpdateSpecificationDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool enabled { get; set; }
    }
}

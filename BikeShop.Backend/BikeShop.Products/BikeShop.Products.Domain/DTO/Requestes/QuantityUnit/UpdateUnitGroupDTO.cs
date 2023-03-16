using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.QuantityUnit
{
    public class UpdateUnitGroupDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Enabled { get; set; }
    }
}

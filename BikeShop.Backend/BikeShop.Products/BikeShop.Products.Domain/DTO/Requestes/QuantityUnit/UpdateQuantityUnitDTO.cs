using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.QuantityUnit
{
    public class UpdateQuantityUnitDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public bool IsDefaultInGroup { get; set; }
        public bool IsSwitchable { get; set; }
        public bool IsSplittable { get; set; }
        public decimal BaseCoeficient { get; set; }
        public bool Enabled { get; set; }
    }
}

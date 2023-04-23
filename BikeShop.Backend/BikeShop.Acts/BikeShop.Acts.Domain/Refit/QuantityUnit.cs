using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class QuantityUnit : BaseEntity
    {
        public string Name { get; set; }
        public string FullName { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public bool IsDefaultInGroup { get; set; }
        public bool IsSwitchable { get; set; }
        public bool IsSplittable { get; set; }
        public decimal BaseCoeficient { get; set; }
    }
}

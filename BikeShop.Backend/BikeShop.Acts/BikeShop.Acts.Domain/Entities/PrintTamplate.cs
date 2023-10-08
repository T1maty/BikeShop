using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class PrintTamplate : BaseEntity
    {
        public string Name { get; set; }
        public string ScribanTamplate { get; set; }
    }
}

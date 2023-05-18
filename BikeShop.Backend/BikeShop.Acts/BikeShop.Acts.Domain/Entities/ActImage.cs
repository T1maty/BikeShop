using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class ActImage:BaseEntity
    {
        public string ActType { get; set; }
        public int ActId { get; set; }
        public string ImageURL { get; set; }
    }
}

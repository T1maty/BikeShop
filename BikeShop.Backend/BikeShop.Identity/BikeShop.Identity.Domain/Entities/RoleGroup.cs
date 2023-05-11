using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.Entities
{
    public class RoleGroup : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

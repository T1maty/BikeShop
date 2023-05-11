using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.Entities
{
    public class RoleGroupBind : BaseEntity
    {
        public string Role { get; set; }
        public string Description { get; set; }
        public string GroupName { get; set; }
        public int RoleGroupId { get; set; }
    }
}

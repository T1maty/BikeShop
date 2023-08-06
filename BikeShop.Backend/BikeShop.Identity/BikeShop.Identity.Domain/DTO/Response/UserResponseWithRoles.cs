using BikeShop.Identity.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Response
{
    public class UserResponseWithRoles
    {
        public UserResponse User { get; set; }
        public List<string> Roles { get; set; }
    }
}

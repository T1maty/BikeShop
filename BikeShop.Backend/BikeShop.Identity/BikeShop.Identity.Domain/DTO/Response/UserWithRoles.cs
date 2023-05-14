using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Response
{
    public class UserWithRoles
    { 
        public ApplicationUser User { get; set; }
        public List<string> Roles { get; set; }
    }
}

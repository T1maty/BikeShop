using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Interfaces
{
    public interface IAuthService
    {
        public Task<UserResponseWithRoles> Register(RegisterFullDTO dto);
    }
}

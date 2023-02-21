using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Interfaces
{
    public interface IUserService
    {
        public Task<UserDTO> GetUserById(Guid id);
    }
}

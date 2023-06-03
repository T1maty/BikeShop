using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public Task<Dictionary<string, UserDTO>> GetUsersDictionary(List<string> guids);

        public Task SetUsersShop(Guid userId, int shopId);

        public Task<List<UserWithRoles>> Search(string Querry, int Take);
        public Task<List<UserWithRoles>> GetEmployees(int ShopId);
        public Task addUserToRole(Guid userId, string Role);
    }
}

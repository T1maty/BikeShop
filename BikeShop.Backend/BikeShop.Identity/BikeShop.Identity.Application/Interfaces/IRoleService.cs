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
    public interface IRoleService
    {
        public Task<List<IdentityRole>> GetAll();
        public Task<List<RoleGroupWithRoles>> GetAllGroups();
        public Task<RoleGroup> CreateGroup(string Name, string Description);
        public Task<RoleGroupWithRoles> SetRoleToGroup(string Role, int GroupId, string Description);
        public Task<IdentityUser> SetGroupToUser(int GroupId, Guid UserId);
        public Task<IdentityUser> SetRoleToUser(string Role, Guid UserId);
        public Task<IdentityRole> Create(string Name);
    }
}

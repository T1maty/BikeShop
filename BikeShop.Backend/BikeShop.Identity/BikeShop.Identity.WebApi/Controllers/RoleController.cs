using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers
{
    [ApiController]
    [Route("role")]
    [Produces("application/json")]
    public class RoleController:ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet("getall")]
        public async Task<List<IdentityRole>> GetAll()
        {
            return await _roleService.GetAll();
        }

        [HttpGet("getallgroups")]
        public async Task<List<RoleGroupWithRoles>> GetAllGroups()
        {
            return await _roleService.GetAllGroups();
        }

        [HttpPost("creategroup")]
        public async Task<RoleGroup> CreateGroup(string Name, string Description)
        {
            return await _roleService.CreateGroup(Name, Description);
        }

        [HttpPut("setroletogroup")]
        public async Task<RoleGroupWithRoles> SetRoleToGroup(string Role, int GroupId, string Description)
        {
            return await _roleService.SetRoleToGroup(Role, GroupId, Description);
        }

        [HttpPut("setgrouptouser")]
        public async Task<UserWithRoles> SetGroupToUser(int GroupId, Guid UserId)
        {
            return await _roleService.SetGroupToUser(GroupId, UserId);
        }

        [HttpPut("setroletouser")]
        public async Task<UserWithRoles> SetRoleToUser(string Role, Guid UserId)
        {
            return await _roleService.SetRoleToUser(Role, UserId);
        }

        [HttpPost("create")]
        public async Task<IdentityRole> Create(string Name)
        {
            return await _roleService.Create(Name);
        }

        [HttpDelete("removerolefromgroup")]
        public async Task<RoleGroupWithRoles> RemoveRoleFromGroup(int GroupId, string Role)
        {
            return await _roleService.RemoveRoleFromGroup(GroupId, Role);
        }

        [HttpDelete("removerolefromuser")]
        public async Task<UserWithRoles> RemoveRoleFromUser(Guid UserId, string Role)
        {
            return await _roleService.RemoveRoleFromUser(UserId, Role);
        }
    }
}

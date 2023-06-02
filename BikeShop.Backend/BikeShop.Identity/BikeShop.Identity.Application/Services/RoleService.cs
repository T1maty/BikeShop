using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IAuthDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleService(IAuthDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityRole> Create(string Name)
        {
            var ent = new IdentityRole() { Name = Name, NormalizedName = Name.Normalize() };
            await _roleManager.CreateAsync(ent);
            return ent;
        }

        public async Task<RoleGroup> CreateGroup(string Name, string Description)
        {
            var ent = new RoleGroup() { Name = Name,Description = Description };
            await _context.RoleGroups.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<List<IdentityRole>> GetAll()
        {
            return await _roleManager.Roles.ToListAsync();
        }

        public async Task<List<RoleGroupWithRoles>> GetAllGroups()
        {
            var group = await _context.RoleGroups.ToListAsync();
            var binds = await _context.RoleGroupBinds.ToListAsync();
            return group.Select(n => new RoleGroupWithRoles { group = n, Roles = binds.Where(n1=>n1.RoleGroupId == n.Id).ToList() }).ToList();
        }

        public async Task<RoleGroupWithRoles> RemoveRoleFromGroup(int GroupId, string Role)
        {
            var ent = _context.RoleGroupBinds.Where(n => n.RoleGroupId == GroupId).Where(n => n.Role == Role);
            _context.RoleGroupBinds.RemoveRange(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            var group = await _context.RoleGroups.FindAsync(GroupId);
            var roles = await _context.RoleGroupBinds.Where(n => n.RoleGroupId == GroupId).ToListAsync();

            return new RoleGroupWithRoles { group = group, Roles = roles };
        }

        public async Task<UserWithRoles> RemoveRoleFromUser(Guid UserId, string Role)
        {
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            await _userManager.RemoveFromRoleAsync(user, Role);
            return new UserWithRoles { User = user, Roles = (List<string>)await _userManager.GetRolesAsync(user) };
        }

        public async Task<UserWithRoles> SetGroupToUser(int GroupId, Guid UserId)
        {
            var roles = await _context.RoleGroupBinds.Where(n => n.RoleGroupId == GroupId).Select(n => n.Role).ToListAsync();
            await _userManager.AddToRolesAsync(await _userManager.FindByIdAsync(UserId.ToString()),roles);
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            return new UserWithRoles { Roles = (List<string>)await _userManager.GetRolesAsync(user), User = user };
        }

        public async Task<RoleGroupWithRoles> SetRoleToGroup(string Role, int GroupId, string Description)
        {
            var group = await _context.RoleGroups.FindAsync(GroupId);
            var bind = new RoleGroupBind { GroupName = group.Name, Description = Description, Role = Role, RoleGroupId = group.Id };
            await _context.RoleGroupBinds.AddAsync(bind);
            await _context.SaveChangesAsync(new CancellationToken());
            return new RoleGroupWithRoles { group = group, Roles = await _context.RoleGroupBinds.Where(n => n.RoleGroupId == group.Id).ToListAsync() };
        }

        public async Task<UserWithRoles> SetRoleToUser(string Role, Guid UserId)
        {
            await _userManager.AddToRoleAsync(await _userManager.FindByIdAsync(UserId.ToString()), Role);
            var user = await _userManager.FindByIdAsync(UserId.ToString());
            return new UserWithRoles { Roles = (List<string>)await _userManager.GetRolesAsync(user), User = user };

        }
    }
}

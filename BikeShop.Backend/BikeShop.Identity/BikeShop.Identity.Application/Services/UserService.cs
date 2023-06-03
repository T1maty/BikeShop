using AutoMapper;
using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BikeShop.Identity.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IAuthDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(IAuthDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<UserWithRoles>> GetEmployees(int ShopId)
        {
            if (ShopId == 0) 
            {
                var users = await _userManager.Users.Where(n => n.ShopId > 0).ToListAsync();
                var res = new List<UserWithRoles>();
                foreach (var n in users)
                {
                    var ent = new UserWithRoles { User = n, Roles = (List<string>)await _userManager.GetRolesAsync(n) };
                    res.Add(ent);
                }
                return res;
            }
            else
            {
                var users = await _userManager.Users.Where(n => n.ShopId == ShopId).ToListAsync();
                var res = new List<UserWithRoles>();
                foreach (var n in users)
                {
                    var ent = new UserWithRoles { User = n, Roles = (List<string>)await _userManager.GetRolesAsync(n) };
                    res.Add(ent);
                }
                return res;
            }
        }

        public async Task<UserDTO> GetUserById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user is null)
                return new UserDTO();

            var res = _mapper.Map<UserDTO>(user);
            return res;
        }

        public async Task<Dictionary<string, UserDTO>> GetUsersDictionary(List<string> guids)
        {
            var dict = new Dictionary<string, UserDTO>();
            foreach (var guid in guids)
            {
                var user = await _userManager.FindByIdAsync(guid);
                if(user != null && !dict.ContainsKey(guid))
                {
                    dict.Add(guid, _mapper.Map<UserDTO>(user));
                }
            }

            return dict;
        }

        public async Task<List<UserWithRoles>> Search(string Querry, int Take)
        {
            var res = Querry.ToLower().Split(" ");
            var contQR = _userManager.Users;
            foreach (var item in res)
            {
                contQR = contQR.Where(n => n.UserName.ToLower().Contains(item)
                                        || n.FirstName.ToLower().Contains(item)
                                        || n.LastName.ToLower().Contains(item)
                                        || n.Patronymic.ToLower().Contains(item)
                                        || n.Email.ToLower().Contains(item)
                                        || n.PhoneNumber.ToLower().Contains(item));
            }

            var users = await contQR.Take(Take).ToListAsync();
            var resp = new List<UserWithRoles>();
            foreach (var user in users)
            {
                resp.Add(new UserWithRoles { User = user, Roles = (List<string>)(await _userManager.GetRolesAsync(user)) });
            }

            return resp;
        }

        public async Task SetUsersShop(Guid userId, int shopId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());

            user.ShopId = shopId;

            await _userManager.UpdateAsync(user);
        }

        public async Task addUserToRole(Guid userId, string Role)
        {
            await _userManager.AddToRoleAsync(await _userManager.FindByIdAsync(userId.ToString()), Role);
        }
    }
}

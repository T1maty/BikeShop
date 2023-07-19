using AutoMapper;
using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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

        public async Task<ApplicationUser> CreateUser(CreateUserDTO model)
        {
            var existingUserByPhone = await _userManager.FindByNameAsync(model.Phone);
            if (existingUserByPhone is not null)
                throw new AlreadyExistsException($"Create user error. User with phone {model.Phone} already exists")
                {
                    Error = "phone_already_exists",
                    ErrorDescription = "Create user error. User with given phone already exists",
                    ReasonField = "phone"
                };


            // Создаю пользователя из запроса
            var user = new ApplicationUser
            {
                UserName = model.Phone,
                PhoneNumber = model.Phone,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Patronymic = model.Patronymic,
            };


            // Добавляю пользователя в бд
            var result = await _userManager.CreateAsync(user, RandomString(8));
            if (!result.Succeeded)

                throw new RegistrationException($"Error while user '{model.Phone}' registration")
                {




                    Error = "error_registration",
                    ErrorDescription = "Registration error. Perhaps the password does not match the requirements",
                    ReasonField = "password"
                };

            // Даю стандартную роль пользователю
            await _userManager.AddToRoleAsync(user, "user");

            return user;
        }

        private static string RandomString(int length)
        {
            var _random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        private static string GenerateSecret(int length)
        {
            var _random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789qwertyuiopasdfghjklzxcvbnm";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        private static string Hash(string secret)
        {
            var h = SHA256.Create();
            var b = h.ComputeHash(Encoding.UTF8.GetBytes(secret));
            StringBuilder sb = new StringBuilder(b.Length * 2);
            foreach (byte i in b)
            {
                sb.AppendFormat("{0:x2}", i);
            }

            return sb.ToString();
        }

        public async Task<string> RegenerateSecret(Guid user)
        {
            var u = await _userManager.FindByIdAsync(user.ToString());
            var s = GenerateSecret(30);

            u.Secret = Hash(s);
            await _userManager.UpdateAsync(u);
            return s;
        }

        public async Task<UserWithRoles> GetUserBySecret(string secret)
        {
            var user = await _userManager.Users.Where(n => n.Secret == Hash(secret)).FirstOrDefaultAsync();

            return await GetUserByIdWithRoles(user.Id);
        }

        private async Task<UserWithRoles> GetUserByIdWithRoles(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var roles = await _userManager.GetRolesAsync(user);

            return new UserWithRoles { Roles = (List<string>)roles, User = user };
        }
    }
    }

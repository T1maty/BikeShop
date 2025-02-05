﻿using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;
using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.WebApi.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BikeShop.Identity.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IAuthDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(IAuthDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
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

            var res = new UserDTO { balance = user.Balance, creditLimit = user.CreditLimit, email = user.Email, emailConfirmed = user.EmailConfirmed
            , firstName = user.FirstName, id=Guid.Parse(user.Id), lastName =user.LastName, patronymic=user.Patronymic, phoneNumber= user.PhoneNumber, phoneNumberConfirmed= user.PhoneNumberConfirmed, shopId=user.ShopId};
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
                    dict.Add(guid, new UserDTO
                    {
                        balance = user.Balance,
                        creditLimit = user.CreditLimit,
                        email = user.Email,
                        emailConfirmed = user.EmailConfirmed
            ,
                        firstName = user.FirstName,
                        id = Guid.Parse(user.Id),
                        lastName = user.LastName,
                        patronymic = user.Patronymic,
                        phoneNumber = user.PhoneNumber,
                        phoneNumberConfirmed = user.PhoneNumberConfirmed,
                        shopId = user.ShopId
                    });
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

        public async Task<ApplicationUser> CreateUser(CreateUserDTO model, string bike = "")
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
                Bike = bike,
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

        public async Task<string> gfb()
        {
            string connectionString = "Server=zf452963.mysql.tools;Database=zf452963_db;Uid=zf452963_db;Pwd=Q9kUMTVr;";
            MySqlConnection dbConnection = new MySqlConnection(connectionString);

            MySqlCommand command = new MySqlCommand("SELECT telephone, name, bike, balance FROM clients", dbConnection);

            dbConnection.Open();


            MySqlDataAdapter adapter = new MySqlDataAdapter(command);
            DataTable dt = new DataTable();
            adapter.Fill(dt);

            string response = "";

            int success = 0, fail = 0;

            foreach (DataRow row in dt.Rows)
            {
                CreateUserDTO userData;
                var fio = row[1].ToString().Trim().Split(" ");
                if(fio.Length == 1)
                {
                    userData = new CreateUserDTO { FirstName = fio[0], Phone = "+38"+row[0].ToString() };
                }else if(fio.Length == 2) 
                {
                    userData = new CreateUserDTO { FirstName = fio[0], LastName = fio[1], Phone = "+38" + row[0].ToString() };
                }
                else
                {
                    userData = new CreateUserDTO { LastName = fio[0], FirstName = fio[1], Patronymic = fio[2], Phone = "+38" + row[0].ToString() };
                }

                try
                {
                    await CreateUser(userData, row[2].ToString());
                    success++;
                }
                catch (Exception)
                {
                    fail++;
                }

                var user = await _userManager.FindByLoginAsync("+38" + row[0].ToString(), "");
                if(user != null)
                {
                    user.Bike = row[2].ToString();
                    user.Balance = decimal.Parse(row[3].ToString())/(decimal)37.5;
                    await _userManager.UpdateAsync(user);
                }

            }

            return $"Success: {success}, Fail: {fail}, Total: {dt.Rows.Count}";
        }

        public async Task<UserResponseWithRoles> GetUserResponseWithRoles(Guid id)
        {
            var appUser = await _userManager.FindByIdAsync(id.ToString());
            var roles = await _userManager.GetRolesAsync(appUser);

            var userResp = new UserResponseWithRoles { User = new UserResponse
            {
                 Balance= appUser.Balance,
                  Bike = appUser.Bike, Created = appUser.Created, CreditLimit = appUser.CreditLimit, Email= appUser.Email, EmailConfirmed = appUser.EmailConfirmed,
                   FirstName= appUser.FirstName, Id=Guid.Parse(appUser.Id), IsEmployee=appUser.IsEmployee, LastName = appUser.LastName , Patronymic = appUser.Patronymic , PhoneNumber = appUser.PhoneNumber,
                    PhoneNumberConfirmed = appUser.PhoneNumberConfirmed, ShopId = appUser.ShopId, TwoFactorEnabled = appUser.TwoFactorEnabled, Updated = appUser.Updated
            }, Roles = (List<string>)roles };


            return userResp;
        }

        public async Task UpdatePublic(UpdateUserPublicModel dto, string Id)
        {
            // Ищу пользователя по айди
            var user = await _userManager.FindByIdAsync(Id);

            // Если не найден - ошибка
            if (user is null)
                throw new NotFoundException($"Update user public error. User with id {Id} not found")
                {
                    Error = "user_not_found",
                    ErrorDescription = "Update user public error. User with given id not found",
                    ReasonField = "userId"
                };

            // Если есть юзер с такой почтой - ошибка
            if (dto.Email is not null)
            {
                var emailUser = await _userManager.FindByEmailAsync(dto.Email);
                if (emailUser is not null)
                    throw new AlreadyExistsException(
                        $"Update user public error. User with email {dto.Email} already exists")
                    {
                        Error = "email_already_exists",
                        ErrorDescription = "Update user public error. User with given email already exists",
                        ReasonField = "email"
                    };
            }

            // Если все ок - обновляю
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Patronymic = dto.Patronymic;
            user.Email = dto.Email;

            await _userManager.UpdateAsync(user);
        }

        public async Task<UserModelListModel> GetUsersByPhoneOrFio(GetUserByPhoneOrFioModel dto)
        {
            if (dto.Phone is null && dto.FIO is null)
                throw new GetUsersException("Create user error")
                {
                    Error = "phone_fio_null",
                    ErrorDescription = "Get users error. Phone AND FIO are absent",
                    ReasonField = "phone_fio"
                };

            // Получить юзеров по куску телефона или по куску ФИО
            // это пиздец
            //////////////// ниже до конца говнокод не смотрите

            Expression<Func<ApplicationUser, bool>> pred;
            dto.FIO = dto.FIO?.ToLower();

            // Если И телефон И ФИО указаны
            if (dto.Phone is not null && dto.FIO is not null)
                // Predicate - у юзера с базы есть кусок введенного телефона И 
                //             у ФИО юзера с базы есть кусок введеного фио
                pred = user => user.PhoneNumber.Contains(dto.Phone) &&
                               (user.LastName + user.FirstName + user.Patronymic)
                               .ToLower().Contains(dto.FIO);

            // Если телефон не указан, ищем только кусок ФИО
            else if (dto.Phone is null)
                pred = user => (user.LastName + user.FirstName + user.Patronymic)
                    .ToLower().Contains(dto.FIO);

            // Если ФИО не указано, а телефон указан, ищу кусок телефона
            else
                pred = user => user.PhoneNumber.Contains(dto.Phone);

            // Ищу пользователя по сформированному предикату
            var users = await _userManager.Users.Where(pred).ToListAsync();

            var resultModel = new UserModelListModel
            {
                Users = new List<GetUserModel>()
            };

            // Подтягиваю роли всех найденных юзеров
            foreach (var user in users)
            {
                resultModel.Users.Add(new GetUserModel
                {
                    User = user,
                    UserRoles = await _userManager.GetRolesAsync(user)
                });
            }

            return resultModel;
        }
    }
}

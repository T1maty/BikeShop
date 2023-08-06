using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;
        private static Random _random = new Random();

        public AuthService(UserManager<ApplicationUser> userManager, IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        public async Task<UserResponseWithRoles> Register(RegisterFullDTO dto)
        {
            // Если есть пользователь с таким телефоном - ошибка
            if(dto.Email != null)
            {
                var existingUserByMail = await _userManager.FindByEmailAsync(dto.Email);
                if (existingUserByMail is not null)
                    throw new AlreadyExistsException($"Create user error. User with email {dto.Email} already exists")
                    {
                        Error = "email_already_exists",
                        ErrorDescription = "Create user error. User with given email already exists",
                        ReasonField = "email"
                    };
            }

            var existingUserByPhone = await _userManager.FindByNameAsync(dto.Phone);
            if (existingUserByPhone is not null)
                throw new AlreadyExistsException($"Create user error. User with phone {dto.Phone} already exists")
                {
                    Error = "phone_already_exists",
                    ErrorDescription = "Create user error. User with given phone already exists",
                    ReasonField = "phone"
                };


            // Создаю пользователя из запроса
            var user = new ApplicationUser
            {
                UserName = dto.Phone,
                PhoneNumber = dto.Phone,
                FirstName = dto.FirstName != null ? dto.FirstName : null,
                LastName = dto.LastName != null ? dto.LastName : null,
                Patronymic = dto.Patronymic != null ? dto.Patronymic : null,
                Email = dto.Email != null ? dto.Email : null
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)

                throw new RegistrationException($"Error while user '{dto.Phone}' registration")
                {
                    Error = "error_registration",
                    ErrorDescription = "Registration error. Perhaps the password does not match the requirements",
                    ReasonField = "password"
                };


            return await _userService.GetUserResponseWithRoles(Guid.Parse(user.Id));
            
        }
    }
}

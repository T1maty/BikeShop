using AutoMapper;
using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
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
    }
}

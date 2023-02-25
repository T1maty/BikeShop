using BikeShop.Service.Application.DTO;
using BikeShop.Service.Domain.Entities;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.RefitClients
{
    public interface IIdentityClient
    {
        [Get("/user/getById")]
        public Task<UserDTO?> GetById(Guid id);

        [Post("/user/getdictionary")]
        public Task<Dictionary<string, UserDTO>> GetDictionary(List<string> guids);
    }
}

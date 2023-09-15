using BikeShop.Shop.Domain.DTO.RefitModels;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.ReficClients
{
    public interface IIdentityClient
    {
        [Post("/user/changeshop")]
        public Task ChangeShop(Guid userId, int shopId);

        [Get("/user/getbyid")]
        public Task<User> GetById(Guid id);
    }
}

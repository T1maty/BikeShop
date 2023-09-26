using BikeShop.Acts.Domain.Refit;
using BikeShop.Payments.Domain.DTO.Refit;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Refit
{
    public interface IIdentityClient
    {
        [Put("/balance/editbalance")]
        public Task EditBalance(Guid userId, decimal amount, bool checkLimit);

        [Post("/user/getdictionary")]
        public Task<Dictionary<string, User>> GetDictionary(List<string> guids);
    }
}

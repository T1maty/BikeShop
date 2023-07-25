using BikeShop.Identity.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Application.Interfaces
{
    public interface IUserBalanceService
    {
        public Task<List<ApplicationUser>> GetUsers();
        public Task<ApplicationUser> EditBalance(Guid userId, decimal amount, bool checkLimit);
        public Task<ApplicationUser> SetCreditLimit(Guid userId, decimal amount);

    }
}

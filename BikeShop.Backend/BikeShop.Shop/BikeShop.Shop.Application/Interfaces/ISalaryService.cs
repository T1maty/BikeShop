using BikeShop.Shop.Domain.DTO.Salary;
using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Interfaces
{
    public interface ISalaryService
    {
        public Task<UserSalary> UpdateSalary(Guid UserId, decimal Rate, decimal ShopPercent, decimal WorkPercent, decimal WorkshopPercent);
        public Task<UserSalary> Get(Guid UserId);
        public Task<CalculateSalary> Calculate(Guid UserId, DateTime Start, DateTime Finish);

    }
}

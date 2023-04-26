using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Salary;
using BikeShop.Shop.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Implemetations
{
    public class SalaryService : ISalaryService
    {
        private readonly IApplicationDbContext _context;

        public SalaryService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CalculateSalary> Calculate(Guid UserId, DateTime Start, DateTime Finish)
        {
            var ent = new CalculateSalary();



            return ent;
        }

        public async Task<UserSalary> Get(Guid UserId)
        {
            var ent = await _context.UserSalaries.Where(n => n.UserId == UserId).FirstOrDefaultAsync();
            
            if(ent == null)
            {
                return new UserSalary { UserId = UserId};
            }
            else
            {
                return ent;
            }
        }

        public async Task<UserSalary> UpdateSalary(Guid UserId, decimal Rate, decimal ShopPercent, decimal WorkPercent, decimal WorkshopPercent)
        {
            var ent = await _context.UserSalaries.Where(n => n.UserId == UserId).FirstOrDefaultAsync();
            if(ent == null)
            {
                ent = new UserSalary { Rate = Rate, UserId = UserId, ShopPercent = ShopPercent, WorkPercent = WorkPercent, WorkshopPercent = WorkshopPercent };
                await _context.UserSalaries.AddAsync(ent);
            }
            else
            {
                ent.WorkshopPercent = WorkshopPercent;
                ent.ShopPercent = ShopPercent;
                ent.WorkPercent = WorkPercent;
                ent.Rate = Rate;
            }

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }
    }
}

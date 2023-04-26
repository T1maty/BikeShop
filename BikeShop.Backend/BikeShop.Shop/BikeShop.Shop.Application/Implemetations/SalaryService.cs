using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Application.ReficClients;
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
        private readonly IServiceClient _serviceClient;
        private readonly IShiftService _shiftService;
        private readonly IPaymentClient _paymentClient;

        public SalaryService(IApplicationDbContext context, IServiceClient serviceClient, IShiftService shiftService, IPaymentClient paymentClient)
        {
            _context = context;
            _serviceClient = serviceClient;
            _shiftService = shiftService;
            _paymentClient = paymentClient;
        }

        public async Task<CalculateSalary> Calculate(Guid UserId, DateTime Start, DateTime Finish)
        {
            var ent = new CalculateSalary();
            if (Finish == DateTime.MinValue) Finish = DateTime.Now;

            var prms = await Get(UserId);
            var hours = await _shiftService.GetHours(UserId, Start, Finish);

            var prods = await _serviceClient.GetProductsByMaster(UserId);
            var works = await _serviceClient.GetWorksByMaster(UserId);
            var bills = await _paymentClient.GetBillsByUser(UserId, Start, Finish);

            ent.ServiceWorks = works.Count;
            ent.SeviceProducts = prods.Count;
            ent.Bills = bills.Count;

            ent.PeriodStart = Start;
            ent.PeriodFinish = Finish;

            var prodsTotal = prods.Select(n=>n.Total).Sum();
            var worksTotal = works.Select(n=>n.Total).Sum();
            var billsTotal = bills.Select(n => n.products.Select(n=>n.Total).Sum()).Sum();

            ent.WorkTotal = worksTotal / 100 * prms.WorkPercent;
            ent.ProductsTotal = prodsTotal / 100 * prms.WorkshopPercent;
            ent.BillsTotal = billsTotal / 100 * prms.ShopPercent;

            ent.Hours = hours;
            ent.Rate = (decimal.Parse(hours.TotalHours.ToString())) * prms.Rate;

            ent.UserId = UserId;

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

using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.Payout;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Acts.Domain.Refit;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class PayoutService : IPayoutService
    {
        private readonly IApplicationDbContext _context;
        private readonly IShopClient _shopClient;

        public PayoutService(IApplicationDbContext context, IShopClient shopClient)
        {
            _context = context;
            _shopClient = shopClient;
        }

        public async Task<Payout> Create(CreatePayoutDTO dto)
        {
            var ent = new Payout { Amount = dto.Amount, Description = dto.Description, Source = dto.Source, SourceId = dto.SourceId, TargetUserId = dto.User };
            await _context.Payouts.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }

        public async Task<List<Payout>> Get(int Take)
        {
            return await _context.Payouts.Where(n => n.Enabled == true).Take(Take).ToListAsync();
        }

        public async Task<List<SalaryPaymentHistory>> SalaryHistory(Guid user)
        {
            return await _context.SalaryPaymentHistory.Where(n=>n.UserId== user).OrderByDescending(n=>n.Time).ToListAsync();
        }

        public async Task<Payout> SalaryPayOut(SalaryPayoutDTO dto)
        {
            var lastPayment = await _context.SalaryPaymentHistory.Where(n => n.UserId == dto.User).FirstOrDefaultAsync();

            DateTime lastPayDate;
            DateTime newPayDate = DateTime.Now;
            if (lastPayment == null) lastPayDate = DateTime.MinValue;
            else lastPayDate = lastPayment.Time;

            var calculatedSalary = await _shopClient.CalculateSalary(dto.User,lastPayDate, newPayDate);

            var ent = new Payout();
            ent.Source = "SalaryPayout";
            ent.SourceId = 0;
            ent.TargetUserId = dto.User;
            ent.Amount = calculatedSalary.Rate + calculatedSalary.BillsTotal + calculatedSalary.ProductsTotal + calculatedSalary.WorkTotal;
            ent.Description = dto.Description;

            await _context.Payouts.AddAsync(ent);
            await _context.SalaryPaymentHistory.AddAsync(new SalaryPaymentHistory { Time = newPayDate, Total = ent.Amount, UserId = dto.User });
            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }
    }
}

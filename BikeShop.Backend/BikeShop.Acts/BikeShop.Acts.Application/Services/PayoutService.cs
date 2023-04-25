using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.Payout;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
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

        public PayoutService(IApplicationDbContext context)
        {
            _context = context;
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
    }
}

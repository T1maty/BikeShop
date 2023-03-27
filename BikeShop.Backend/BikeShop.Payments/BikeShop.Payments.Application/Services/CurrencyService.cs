using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Services
{
    public class CurrencyService : ICurrencyService
    {
        private readonly IApplicationDbContext _context;

        public CurrencyService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Currency> Create(CreateCurrencyDTO dto)
        {
            var ent = new Currency { Coefficient = dto.Coefficient, Enabled = dto.Enabled, IsBaseCurrency = dto.IsBaseCurrency, Symbol = dto.Symbol, Name = dto.Name };
            await _context.Currencies.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());
            await _context.CurrencyHistories.AddAsync(new CurrencyHistory { Coefficient = ent.Coefficient, CurrencyId = ent.Id});
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<List<Currency>> GetAll()
        {
            return await _context.Currencies.ToListAsync();
        }

        public async Task<List<CurrencyHistory>> GetHistory(int currencyId)
        {
            return await _context.CurrencyHistories.Where(n => n.CurrencyId == currencyId).ToListAsync();
        }

        public async Task<Currency> Update(UpdateCurrencyDTO dto)
        {
            var ent = await _context.Currencies.FindAsync(dto.Id);

            if(dto.Coefficient != ent.Coefficient)
            {
                await _context.CurrencyHistories.AddAsync(new CurrencyHistory { Coefficient = dto.Coefficient, CurrencyId = ent.Id });
            }

            ent.IsBaseCurrency = dto.IsBaseCurrency;
            ent.UpdatedAt = DateTime.Now;
            ent.Coefficient = dto.Coefficient;
            ent.Enabled = dto.Enabled;
            ent.Name = dto.Name;
            ent.Symbol = dto.Symbol;

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }
    }
}

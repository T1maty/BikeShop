using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Implemetations
{
    public class CashboxService : ICashboxService
    {
        private readonly IApplicationDbContext _context;

        public CashboxService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CashboxHistory> Action(int ShopId, string Source, int SourceId, decimal CashAction, decimal TerminalAction)
        {
            var shop = await _context.Shops.FindAsync(ShopId);
            if (shop == null) throw new System.Exception();

            
            shop.CashboxCash += CashAction;
            shop.CashboxTerminal += TerminalAction;

            var ent = new CashboxHistory { AfterActionCash = shop.CashboxCash, AfterActionTerminal = shop.CashboxTerminal, ShopId = ShopId, CashAction = CashAction, TerminalAction = TerminalAction, Source = Source, SourceId = SourceId };

            await _context.CashboxHistories.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());
            
            return ent;
        }
    }
}

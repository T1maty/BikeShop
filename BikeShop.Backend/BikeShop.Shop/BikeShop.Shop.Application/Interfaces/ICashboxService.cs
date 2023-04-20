using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Interfaces
{
    public interface ICashboxService
    {
        public Task<CashboxHistory> Action(int ShopId, string Source, int SourceId, decimal CashAction, decimal TerminalAction);
    }
}

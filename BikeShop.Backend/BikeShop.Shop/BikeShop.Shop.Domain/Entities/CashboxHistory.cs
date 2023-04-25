using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Entities
{
    public class CashboxHistory : BaseEntity
    {
        public int ShopId { get; set; }
        public string Source { get; set; }
        public int SourceId { get; set; }
        public decimal CashAction { get; set; }
        public decimal TerminalAction { get; set; }
        public decimal AfterActionCash { get; set; }
        public decimal AfterActionTerminal { get; set; }
    }
}

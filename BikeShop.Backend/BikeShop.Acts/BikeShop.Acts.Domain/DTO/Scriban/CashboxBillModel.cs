using Scriban.Runtime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class CashboxBillModel : ScriptObject
    {
        public string Id { get; set; }
        public string Date { get; set; } 
        public List<CashboxBillModelProduct> Products { get; set; }
        public string CurSymbol { get; set; }
        public string Manager { get; set; }
        public string Client { get; set; }
        public string WithoutDisc { get; set; }
        public string Disc { get; set; }
        public string Total { get; set; }
    }
}

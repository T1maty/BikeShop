using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class EncashmentModel
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public decimal Cash { get; set; }
        public decimal Terminal { get; set; }
        public decimal Left { get; set; }
        public string CurSymbol { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit
{
    public class Currency
    {
        public string Name { get; set; }
        public string Symbol { get; set; }
        public decimal Coefficient { get; set; }
        public bool IsBaseCurrency { get; set; } = false;
    }
}

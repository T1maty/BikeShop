using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class CreateCurrencyDTO
    {
        public string Name { get; set; }
        public string Symbol { get; set; }
        public decimal Coefficient { get; set; }
        public bool IsBaseCurrency { get; set; } = false;
        public bool Enabled { get; set; } = false;
    }
}

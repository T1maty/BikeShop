using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class CashboxBillModelProduct
    {
        public string Name { get; set; }
        public string Price { get; set; }
        public string QuanUnit { get; set; }
        public string Quantity { get; set; }
        public string Total { get; set; }
    }
}

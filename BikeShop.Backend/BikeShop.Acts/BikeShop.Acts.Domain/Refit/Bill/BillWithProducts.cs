using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit.Bill
{
    public class BillWithProducts
    {
        public Bill bill { get; set; }
        public List<BillProduct> products { get; set; }
        public Payment Payment { get; set; }
    }
}

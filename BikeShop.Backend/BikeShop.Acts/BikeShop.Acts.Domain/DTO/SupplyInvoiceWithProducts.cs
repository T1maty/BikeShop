using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO
{
    public class SupplyInvoiceWithProducts
    {
        public SupplyInvoice SupplyInvoice { get; set; }
        public List<SupplyInvoiceProduct> SupplyInvoiceProducts { get; set; }
    }
}

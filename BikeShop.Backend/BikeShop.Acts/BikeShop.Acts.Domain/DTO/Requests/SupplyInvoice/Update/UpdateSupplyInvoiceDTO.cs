using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Update
{
    public class UpdateSupplyInvoiceDTO
    {
        public SupplyInvoiceUpdDTO SupplyInvoice { get; set; }
        public List<ProductSupplyInvoiceUpdDTO> SupplyInvoiceProducts { get; set; }
    }
}

using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Update;
using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Create
{
    public class CreateSupplyInvoiceDTO
    {
        public SupplyInvoiceDTO SupplyInvoice { get; set; }
        public List<ProductSupplyInvoiceDTO> SupplyInvoiceProducts { get; set; }
    }
}

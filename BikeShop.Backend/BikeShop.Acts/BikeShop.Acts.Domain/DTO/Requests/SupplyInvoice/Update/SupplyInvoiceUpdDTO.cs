using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Update
{
    public class SupplyInvoiceUpdDTO
    {
        public int Id { get; set; }
        public Guid User { get; set; }
        public decimal DeliveryPrice { get; set; }
        public decimal AdditionalPrice { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}

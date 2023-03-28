using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class NewBillDTO : PaymentDTO
    {
        public int CurrencyId { get; set; }
        public string Description { get; set; }

        public List<BillProductDTO> Products { get; set; }
    }
}

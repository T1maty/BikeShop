using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class BillProductDTO
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
        public string Description { get; set; }
        public int DiscountId { get; set; }
    }
}

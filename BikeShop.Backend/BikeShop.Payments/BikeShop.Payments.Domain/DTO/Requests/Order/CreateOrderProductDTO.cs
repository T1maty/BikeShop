using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class CreateOrderProductDTO
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int DiscountId { get; set; }
    }
}

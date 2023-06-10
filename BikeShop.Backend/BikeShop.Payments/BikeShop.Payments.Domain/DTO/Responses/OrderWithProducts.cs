using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Responses
{
    public class OrderWithProducts
    {
        public Order Order { get; set; }
        public List<OrderProduct> Products { get; set; }
    }
}

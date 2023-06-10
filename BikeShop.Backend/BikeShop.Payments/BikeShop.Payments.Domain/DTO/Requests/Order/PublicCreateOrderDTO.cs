using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests.Order
{
    public class PublicCreateOrderDTO
    {
        public OrderCreationDTO Order { get; set; }
        public List<CreateOrderProductDTO> Products { get; set; }
    }
}

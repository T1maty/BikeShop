using BikeShop.Payments.Domain.DTO.Refit;
using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Responses
{
    public class OrderWithProducts
    {
        public Order Order { get; set; }
        public User Client { get; set; }
        public User? UserCreated { get; set; }
        public User? UserUpdated { get; set; }
        public User? Manager { get; set; }
        public Payment? Payment { get; set; }
        public List<OrderProduct> Products { get; set; }
        public List<OrderStatusHistory> StatusHistories { get; set; }
    }
}

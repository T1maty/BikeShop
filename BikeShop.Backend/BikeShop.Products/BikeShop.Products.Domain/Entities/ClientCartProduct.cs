using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ClientCartProduct : BaseEntity
    {
        public Guid ClientId { get; set; }
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
    }
}

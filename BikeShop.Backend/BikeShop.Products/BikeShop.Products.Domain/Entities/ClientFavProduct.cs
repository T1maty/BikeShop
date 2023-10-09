using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ClientFavProduct : BaseEntity
    {
        public int ProductId { get; set; }
        public Guid ClientId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Product
{
    public class ResponseProductWithCategory
    {
        public Entities.Product product { get; set; }
        public Dictionary<int, string> tags { get; set; } = new Dictionary<int, string>();
    }
}

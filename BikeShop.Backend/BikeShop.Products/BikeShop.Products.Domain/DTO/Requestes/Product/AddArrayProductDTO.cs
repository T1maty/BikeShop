using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Product
{
    public class AddArrayProductDTO
    {
        public string name { get; set; }
        public string catalog_key { get; set; }
        public string category { get; set; }
        public string quantity { get; set; }
        public string price_in { get; set; }
        public string price_out { get; set; }
        
    }
}

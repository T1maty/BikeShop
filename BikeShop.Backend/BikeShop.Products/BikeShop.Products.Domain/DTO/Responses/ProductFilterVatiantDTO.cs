using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class ProductFilterVatiantDTO
    {
        public string VariantName { get; set; }
        public List<int> ProductIds { get; set; }
    }
}

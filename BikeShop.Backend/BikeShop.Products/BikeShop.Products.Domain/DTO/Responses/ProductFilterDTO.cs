using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class ProductFilterDTO
    {
        public string Name { get; set; }
        public List<ProductFilterVatiantDTO> Variants { get; set; }
    }
}

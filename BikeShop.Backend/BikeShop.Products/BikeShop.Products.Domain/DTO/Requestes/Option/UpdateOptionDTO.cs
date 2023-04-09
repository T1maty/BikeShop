using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Option
{
    public class UpdateOptionDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public List<UpdateVariantDTO> optionVariants { get; set; }
        public bool enabled { get; set; }
    }
}

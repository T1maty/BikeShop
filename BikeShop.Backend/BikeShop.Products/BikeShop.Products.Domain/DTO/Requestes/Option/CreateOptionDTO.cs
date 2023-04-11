using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Option
{
    public class CreateOptionDTO
    {
        public string name { get; set; }

        public List<string> optionVariants { get; set; }
    }
}

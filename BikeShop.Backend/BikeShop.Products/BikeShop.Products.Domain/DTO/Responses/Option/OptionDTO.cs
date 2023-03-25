using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses.Option
{
    public class OptionDTO : BaseEntity
    {
        public string Name { get; set; }
        public List<OptionVariant> optionVariants { get; set; }
    }
}

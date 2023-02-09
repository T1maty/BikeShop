using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductCard : BaseEntity
    {
        public string ImgCompressed { get; set; }
        public string DescriptionShort { get; set; }
        public string Description { get; set; }
    }
}

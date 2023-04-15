using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class UpdateProductTagBindDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public UpdateProductTagDTO ProductTag { get; set; }
    }
}

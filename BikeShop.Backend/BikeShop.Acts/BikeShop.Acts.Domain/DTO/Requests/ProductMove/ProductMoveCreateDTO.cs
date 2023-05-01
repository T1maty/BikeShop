using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.ProductMove
{
    public class ProductMoveCreateDTO
    {
        public MoveCreateDTO ProductMove { get; set; }
        public List<ProductMoveProductDTO> products { get; set; }
    }
}

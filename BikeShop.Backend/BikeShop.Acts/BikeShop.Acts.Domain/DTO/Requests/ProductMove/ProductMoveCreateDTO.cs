using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.ProductMove
{
    public class ProductMoveCreateDTO
    {
        public Guid User { get; set; }
        public int MovingFromSkladId { get; set; }
        public int MovingToSkladId { get; set; }
        public string Description { get; set; }
        public List<ProductMoveProductDTO> products { get; set; }
    }
}

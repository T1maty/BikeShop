using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class StorageProductsDTO
    {
        public Storage Storage { get; set; }
        public List<ProductQuantityDTO> AvailableProducts { get; set; }
        public List<ProductQuantityDTO> ReservedProducts { get; set; }

    }
}

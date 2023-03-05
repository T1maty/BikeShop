using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes
{
    public class CreateStorageDTO
    {
        public string Name { get; set; } = "DefaultName";
        public string SupplyDelay { get; set; } = string.Empty;
        public bool IsOutsource { get; set; } = false;
    }
}

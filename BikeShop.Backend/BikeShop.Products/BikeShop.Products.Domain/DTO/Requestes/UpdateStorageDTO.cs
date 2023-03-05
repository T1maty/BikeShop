using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes
{
    public class UpdateStorageDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = "DefaultName";
        public string SupplyDelay { get; set; } = string.Empty;
        public bool IsOutsource { get; set; } = false;
        public bool Enabled { get; set; } = true;
    }
}

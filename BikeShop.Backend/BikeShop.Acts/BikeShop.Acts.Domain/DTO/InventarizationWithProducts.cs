using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO
{
    public class InventarizationWithProducts
    {
        public Inventarization Inventarization { get; set; }
        public List<InventarizationProduct> Products { get; set; }
    }
}

using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain
{
    public class InventarizationLackWithProducts
    {
        public InventarizationLack InventarizationLack { get; set; }
        public List<InventarizationLackProduct> Products { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes
{
    public class UpdateProductPriceDTO
    {
        public Guid User { get; set; }
        public decimal IncomePrice { get; set; }
        public decimal RetailPrice { get; set;}
        public decimal DealerPrice { get; set; }

        public int ProductId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Entities
{
    public class Bill : BaseEntity
    {
        public Guid UUID { get; set; } = Guid.NewGuid();
        public string? QRCode { get; set; }
        public Guid? FiscalId { get; set; }
        public Guid UserId { get; set; }
        public Guid? ClientId { get; set; }
        public int ShopId { get; set; }
        public int CurrencyId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }


    }
}

using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Refit.Bill
{
    public class Bill : BaseEntity
    {
        public Guid UUID { get; set; } = Guid.NewGuid();
        public Guid? FiscalId { get; set; } = null;
        public Guid UserId { get; set; }
        public Guid? ClientId { get; set; }

        public string? QRCode { get; set; }
        public int ShopId { get; set; }
        public string Description { get; set; }

        public int PaymentId { get; set; }
        public int CurrencyId { get; set; }
        public string CurrencySymbol { get; set; }
        public string CurrencyName { get; set; }

        public decimal Price { get; set; }
        public decimal PriceInCurrency { get; set; }

        public int DiscountId { get; set; }
        public decimal DiscountBill { get; set; }
        public decimal DiscountBillInCurrency { get; set; }

        public decimal DiscountProducts { get; set; }
        public decimal DiscountProductsInCurrency { get; set; }

        public decimal TotalDiscount { get; set; }
        public decimal TotalDiscountInCurrency { get; set; }
        public decimal Total { get; set; }
        public decimal TotalInCurrency { get; set; }
    }
}

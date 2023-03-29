using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables;
using BikeShop.Products.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Services
{
    public class FinancialInteractionService : IFinancialInteractionService
    {
        private readonly IApplicationDbContext _context;

        public FinancialInteractionService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BillWithProducts> NewBill(NewBillDTO dto)
        {
            var currency = await _context.Currencies.FindAsync(dto.CurrencyId);
            var products = new List<BillProduct>();
            foreach (var product in dto.Products)
            {
                products.Add(new BillProduct
                {
                    CatalogKey = product.CatalogKey,
                    CurrencySymbol = currency.Symbol,
                    Description = product.Description,
                    Discount = product.Discount,
                    Name = product.Name,
                    ProductId = product.ProductId,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    QuantityUnitName = product.QuantityUnitName,
                    SerialNumber = product.SerialNumber,
                    Total = product.Quantity * product.Price - product.Discount
                }); ;
            }

            var price = products.Select(n => n.Price * n.Quantity).Sum();
            var discount = products.Sum(n => n.Discount);

            var bill = new Bill {
                ClientId= dto.ClientId,
                CurrencyId= dto.CurrencyId,
                Description= dto.Description,
                ShopId= dto.ShopId,
                UserId= dto.UserId,
                Price = price, 
                Discount = discount,
                Total  = price - discount, 
            };

            await _context.Bills.AddAsync(bill);
            await _context.SaveChangesAsync(new CancellationToken());
            products.ForEach(n => n.BillId = bill.Id);

            var payment = new Payment {
                ShopId = dto.ShopId,
                CurrencyId = dto.CurrencyId,
                Target = PaymentTarget.Cashbox,
                Card = dto.Card,
                Cash = dto.Cash,
                BankCount = dto.BankCount,
                ClientId= dto.ClientId,
                PersonalBalance = dto.PersonalBalance ,
                TargetId = bill.Id,
                Total = dto.BankCount + dto.Cash + dto.Card + dto.PersonalBalance,
                UserId = dto.UserId,
            };

            await _context.BillProducts.AddRangeAsync(products);
            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync(new CancellationToken());

            return new BillWithProducts { bill = bill, products = products };
        }
    }
}

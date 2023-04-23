﻿using BikeShop.Acts.Application.Refit;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
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
        private readonly IPaymentService _paymentService;
        private readonly IProductClient _productClient;
        private readonly IShopClient _shopClient;

        public FinancialInteractionService(IApplicationDbContext context, IPaymentService paymentService, IProductClient productClient, IShopClient shopClient)
        {
            _context = context;
            _paymentService = paymentService;
            _productClient = productClient;
            _shopClient = shopClient;
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
            await _context.BillProducts.AddRangeAsync(products);
            await _paymentService.NewPayment(new CreatePayment { ShopId = dto.ShopId, UserId=dto.UserId, Card = dto.Card, Cash = dto.Cash, ClientId = dto.ClientId, BankCount = dto.BankCount, CurrencyId = dto.CurrencyId, PersonalBalance = dto.PersonalBalance, Target = PaymentTarget.Cashbox, TargetId = bill.Id});
            await _productClient.AddProductsToStorage(products.Select(n=>new Acts.Domain.Refit.ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity*-1}).ToList(), await _shopClient.GetStorageId(dto.ShopId), "Bill", bill.Id);
            await _context.SaveChangesAsync(new CancellationToken());

            return new BillWithProducts { bill = bill, products = products };
        }
    }
}

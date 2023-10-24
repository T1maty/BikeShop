using BikeShop.Payments.Application.Common.Errors;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Refit;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables.PaymentEnums;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace BikeShop.Payments.Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IApplicationDbContext _context;
        private readonly IShopClient _shopClient;
        private readonly IIdentityClient _identityClient;

        public PaymentService(IApplicationDbContext context, IShopClient shopClient, IIdentityClient identityClient)
        {
            _context = context;
            _shopClient = shopClient;
            _identityClient = identityClient;
        }

        public async Task<List<Payment>> GetPayments(int limit)
        {
            return await _context.Payments.OrderByDescending(n=>n.CreatedAt).Take(limit).ToListAsync();
        }

        public async Task<Payment> NewPayment(CreatePayment dto)
        {
            var currency = await _context.Currencies.FindAsync(dto.Payment.CurrencyId);
            if (currency == null) throw CurrencyError.CurrencyNotFound;

            var payment = new Payment
            {
                ShopId = dto.ShopId,
                CurrencyId = currency.Id,
                TotalInCurrency = dto.Payment.Amount * currency.Coefficient,
                Source = dto.Source, 
                Type = dto.Payment.PaymentType,
                Target = dto.Target,
                ClientId = dto.ClientId,
                TargetId = dto.TargetId,
                Total = dto.Payment.Amount,
                UserId = dto.UserId,
            };

            if(dto.Source == PaymentSource.Shop.ToString())
            {
                if (dto.ShopId == null) throw PaymentError.SourceShopWithoutShopId;

                if (dto.Payment.PaymentType != PaymentType.UserBalance.ToString())
                {
                    await _shopClient.Action((int)dto.ShopId, dto.Target, dto.TargetId, 
                        dto.Payment.PaymentType ==  PaymentType.Cash.ToString() ? dto.Payment.Amount:0,
                        (dto.Payment.PaymentType == PaymentType.Card.ToString() || dto.Payment.PaymentType == PaymentType.Terminal.ToString()) ? dto.Payment.Amount : 0);
                }

                if (dto.Payment.PaymentType == PaymentType.UserBalance.ToString())
                {
                    if (dto.ClientId == null) throw PaymentError.UserBalanceWithoutClientId;
                    await _identityClient.EditBalance((Guid)dto.ClientId, dto.Payment.Amount * -1, true);
                }
            }

            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync(new CancellationToken());

            return payment;
        }
    }
}

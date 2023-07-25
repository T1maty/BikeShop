using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Refit;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables;
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
            return await _context.Payments.OrderBy(n=>n.CreatedAt).Take(limit).ToListAsync();
        }

        public async Task<Payment> NewPayment(CreatePayment dto)
        {
            var payment = new Payment
            {
                ShopId = dto.ShopId,
                CurrencyId = dto.CurrencyId,
                Target = dto.Target,
                Card = dto.Card,
                Cash = dto.Cash,
                BankCount = dto.BankCount,
                ClientId = dto.ClientId,
                PersonalBalance = dto.PersonalBalance,
                TargetId = dto.TargetId,
                Total = dto.BankCount + dto.Cash + dto.Card + dto.PersonalBalance,
                UserId = dto.UserId,
            };

            if(dto.Target == PaymentTarget.Cashbox || dto.Target == PaymentTarget.Workshop || dto.Target == PaymentTarget.ReplenishBalance)
            {
                if(dto.Card != 0 || dto.Cash != 0)
                await _shopClient.Action(dto.ShopId, dto.Target, dto.TargetId, dto.Cash, dto.Card);

                if (dto.PersonalBalance != 0)
                {
                    await _identityClient.EditBalance(dto.ClientId, dto.PersonalBalance * -1, true);
                }
            }

            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync(new CancellationToken());

            return payment;
        }
    }
}

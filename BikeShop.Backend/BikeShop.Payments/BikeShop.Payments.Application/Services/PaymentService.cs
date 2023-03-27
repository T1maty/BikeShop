using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IApplicationDbContext _context;

        public PaymentService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> GetPayments(int limit)
        {
            return await _context.Payments.OrderBy(n=>n.CreatedAt).Take(limit).ToListAsync();
        }

        public Task<Payment> NewPayment()
        {
            throw new NotImplementedException();
        }
    }
}

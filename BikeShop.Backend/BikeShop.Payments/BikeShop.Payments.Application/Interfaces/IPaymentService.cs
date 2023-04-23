using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Interfaces
{
    public interface IPaymentService
    {
        public Task<List<Payment>> GetPayments(int limit);
        public Task<Payment> NewPayment(CreatePayment dto);
    }
}

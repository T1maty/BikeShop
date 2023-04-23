using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Payments.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("currency")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<List<Payment>> GetPayments(int limit)
        {
            return await _paymentService.GetPayments(limit);
        }

        [HttpPost]
        public async Task<Payment> NewPayment(CreatePayment dto)
        {
            return await _paymentService.NewPayment(dto);
        }
    }
}

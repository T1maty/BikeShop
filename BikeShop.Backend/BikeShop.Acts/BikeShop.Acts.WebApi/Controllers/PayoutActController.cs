using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.Encashment;
using BikeShop.Acts.Domain.DTO.Requests.Payout;
using BikeShop.Acts.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("payoutact")]
    public class PayoutActController : ControllerBase
    {
        private readonly IPayoutService _payoutService;

        public PayoutActController(IPayoutService payoutService)
        {
            _payoutService = payoutService;
        }

        [HttpPost("create")]
        public async Task<Payout> Create(CreatePayoutDTO dto)
        {
            return await _payoutService.Create(dto);
        }

        [HttpGet("get")]
        public async Task<List<Payout>> Get(int Take)
        {
            return await _payoutService.Get(Take);
        }
    }
}

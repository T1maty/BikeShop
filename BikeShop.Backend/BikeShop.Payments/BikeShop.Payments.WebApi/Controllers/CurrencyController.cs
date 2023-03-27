using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Payments.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("currency")]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyService _currencyService;

        public CurrencyController(ICurrencyService currencyService)
        {
            _currencyService = currencyService;
        }

        [HttpGet("getall")]
        public async Task<List<Currency>> GetProductCard()
        {
            return await _currencyService.GetAll();
        }

        [HttpPost("create")]
        public async Task<Currency> GetProductCard(CreateCurrencyDTO dto)
        {
            return await _currencyService.Create(dto);
        }

        [HttpPut("update")]
        public async Task<Currency> GetProductCard(UpdateCurrencyDTO dto)
        {
            return await _currencyService.Update(dto);
        }
    }
}

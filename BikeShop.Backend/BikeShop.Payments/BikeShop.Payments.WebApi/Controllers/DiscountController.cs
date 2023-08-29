using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests.Discount;
using BikeShop.Payments.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Payments.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("discount")]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpPost("post")]
        public async Task<Discount> CreateDiscount(DiscountCreateDTO dto)
        {
            return await _discountService.CreateDiscount(dto);
        }

        [HttpPut("update")]
        public async Task<Discount> UpdateDiscount(DiscountUpdateDTO dto)
        {
            return await _discountService.UpdateDiscount(dto);
        }

        [HttpGet("getall")]
        public async Task<List<Discount>> GetAll()
        {
            return await _discountService.GetAll();
        }

        [HttpGet("getbytarget")]
        public async Task<List<Discount>> GetByTarget(string target, Guid user)
        {
            return await _discountService.GetByTarget(target, user);
        }

        [HttpDelete("delete")]
        public async Task RemoveDiscount(int discountId)
        {
            await _discountService.RemovaDiscount(discountId);
        }

        [HttpGet("getbyid")]
        public async Task<Discount> GetById(int discountId)
        {
            return await _discountService.GetById(discountId);
        }

        [HttpGet("getpublic")]
        public async Task<List<Discount>> GetPublic()
        {
            return await _discountService.GetAll();
        }

        [HttpGet("calculate")]
        public async Task<decimal> Calculate(int discountId, string target, decimal startPrice)
        {
            return await _discountService.Calculate(discountId, target, startPrice);
        }
    }
}

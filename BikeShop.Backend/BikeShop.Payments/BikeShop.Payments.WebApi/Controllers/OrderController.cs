using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests.Order;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Payments.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("order")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<OrderWithProducts>> GetByShop(int ShopId)
        {
            return await _orderService.GetByShop(ShopId);
        }

        [HttpGet("getall")]
        public async Task<List<OrderWithProducts>> GetAll(int Take, int Skip)
        {
            return await _orderService.GetAll(Take, Skip);
        }

        [HttpGet("getbyid")]
        public async Task<OrderWithProducts> GetById(int Id)
        {
            return await _orderService.GetById(Id);
        }

        [HttpPost("publiccreate")]
        public async Task<OrderWithProducts> PublicCreate(PublicCreateOrderDTO dto)
        {
            return await _orderService.PublicCreate(dto);
        }
    }
}

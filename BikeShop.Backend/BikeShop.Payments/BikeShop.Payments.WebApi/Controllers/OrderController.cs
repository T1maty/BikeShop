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

        [HttpPost("internalcreate")]
        public async Task<OrderWithProducts> InternalCreate(InternalCreateOrderDTO dto)
        {
            return await _orderService.InternalCreate(dto);
        }

        [HttpPost("confirm")]
        public async Task<OrderWithProducts> Confirm(Guid UserId, int OrderId)
        {
            return await _orderService.Confirm(UserId, OrderId);
        }

        [HttpPost("pay")]
        public async Task<OrderWithProducts> AddPayment(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        [HttpPost("collected")]
        public async Task<OrderWithProducts> Collected(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        [HttpPost("cancel")]
        public async Task<OrderWithProducts> Cancel(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        [HttpPost("issue")]
        public async Task<OrderWithProducts> Issue(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        [HttpPost("shipped")]
        public async Task<OrderWithProducts> Shipped(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        [HttpPost("delivered")]
        public async Task<OrderWithProducts> Delivered(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }
    }
}

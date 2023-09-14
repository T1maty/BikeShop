using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Schedule;
using BikeShop.Shop.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Shop.WebApi.Controllers
{
    [ApiController]
    [Route("schedule")]
    [Produces("application/json")]
    public class ScheduleController:ControllerBase
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("getbyshop")]
        public async Task<ScheduleDTO> GetByShop(int shopId, DateTime? Start, DateTime? Finish)
        {
            return await _scheduleService.GetByShop(shopId,Start, Finish);
        }
        [HttpPost("addshift")]
        public async Task<ResponseScheduleWithHistory> CreateScheduleItem(CreateScheduleItemDTO dto)
        {
            return await _scheduleService.CreateScheduleItem(dto);
        }
        [HttpPost("addholyday")]
        public async Task<ResponseScheduleWithHistory> CreateHolydayItem(CreateHolydayItemDTO dto)
        {
            return await _scheduleService.CreateHolydayItem(dto);
        }
        [HttpDelete("removeitem")]
        public async Task<ScheduleHistory> RemoveScheduleItem(Guid User, int ItemId)
        {
            return await _scheduleService.RemoveScheduleItem(User, ItemId);
        }
    }
}

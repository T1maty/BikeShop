using BikeShop.Shop.Application.Interfaces;
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
        public async Task GetByShop()
        {

        }
    }
}

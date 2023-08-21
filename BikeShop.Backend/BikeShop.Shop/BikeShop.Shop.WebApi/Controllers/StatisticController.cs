using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Statistic;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Shop.WebApi.Controllers
{
    [ApiController]
    [Route("statistic")]
    [Produces("application/json")]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("basic")]
        public async Task<BaseStatisticDTO> Basic(DateTime Start, DateTime Finish)
        {
            return await _statisticService.Basic(Start, Finish);
        }
    }
}

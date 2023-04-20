using BikeShop.Acts.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("cashboxaction")]
    public class CashboxActionController
    {
        private readonly ICashboxActionService _actionService;

        public CashboxActionController(ICashboxActionService actionService)
        {
            _actionService = actionService;
        }

        [HttpGet("getbyshop")]
        public async Task GetByShop(int ShopId, int Take)
        {
            await _actionService.GetByShop(ShopId, Take);
        }

        [HttpPost("create")]
        public async Task Create()
        {

        }
    }
}

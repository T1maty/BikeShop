using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.CashboxAction;
using BikeShop.Acts.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("cashboxaction")]
    public class CashboxActionController : ControllerBase
    {
        private readonly ICashboxActionService _actionService;

        public CashboxActionController(ICashboxActionService actionService)
        {
            _actionService = actionService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<CashboxAction>> GetByShop(int ShopId, int Take)
        {
            return await _actionService.GetByShop(ShopId, Take);
        }

        [HttpPost("create")]
        public async Task<CashboxAction> Create(CreateCashboxActionDTO dto)
        {
            return await _actionService.Create(dto);
        }
    }
}

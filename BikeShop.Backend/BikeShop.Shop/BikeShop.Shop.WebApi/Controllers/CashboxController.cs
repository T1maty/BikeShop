using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Shop.WebApi.Controllers
{
    [ApiController]
    [Route("cashbox")]
    [Produces("application/json")]
    public class CashboxController
    {
        private readonly ICashboxService _cashboxService;

        public CashboxController(ICashboxService cashboxService)
        {
            _cashboxService = cashboxService;
        }

        [HttpPost("action")]
        public async Task<CashboxHistory> Action(int ShopId, string Source, int SourceId, decimal CashAction, decimal TerminalAction )
        {
            return await _cashboxService.Action(ShopId, Source, SourceId, CashAction, TerminalAction);
        }
    }
}

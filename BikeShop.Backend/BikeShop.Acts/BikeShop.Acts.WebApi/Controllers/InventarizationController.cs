using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.Inventarization;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("inventarization")]
    public class InventarizationController
    {
        private readonly IInventarizationService _inventarizationService;

        public InventarizationController(IInventarizationService inventarizationService)
        {
            _inventarizationService = inventarizationService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<InventarizationWithProducts>> GetByShop(int ShopId, int Take)
        {
            return await _inventarizationService.GetByShop(ShopId, Take);
        }

        [HttpPost("create")]
        public async Task<InventarizationWithProducts> Create(int ShopId, Guid UserId)
        {
            return await _inventarizationService.Create(ShopId, UserId);
        }

        [HttpPut("update")]
        public async Task<InventarizationWithProducts> Update(UpdateInventarizationDTO dto)
        {
            return await _inventarizationService.Update(dto);
        }

        [HttpPut("closeact")]
        public async Task<InventarizationLackWithProducts> CloseAct(int ActId, Guid UserId)
        {
            return await _inventarizationService.CloseAct(ActId, UserId);
        }

        [HttpGet("getlackbyshop")]
        public async Task<List<InventarizationLackWithProducts>> GetLackByShop(int ShopId)
        {
            return await _inventarizationService.GetLackByShop(ShopId);
        }
    }
}

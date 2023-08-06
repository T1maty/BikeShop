using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Services;
using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Create;
using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Update;
using BikeShop.Acts.Domain.DTO;
using Microsoft.AspNetCore.Mvc;
using BikeShop.Acts.Domain.DTO.Requests.OutcomeAct;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("outcome")]
    public class OutcomeActController : ControllerBase
    {
        private readonly IOutcomeActService _outcomeActService;

        public OutcomeActController(IOutcomeActService outcomeActService)
        {
            _outcomeActService = outcomeActService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<OutcomeActWithProducts>> GetByShop(int id, int take)
        {
            return await _outcomeActService.GetByShop(id, take);
        }

        [HttpPost("create")]
        public async Task<OutcomeActWithProducts> Create(CreateOutcomeActDTO dto)
        {
            return await _outcomeActService.Create(dto);
        }

        [HttpPost("execute")]
        public async Task<OutcomeActWithProducts> Execute(int Id, Guid userId)
        {
            return await _outcomeActService.Execute(Id, userId);
        }

        [HttpPut("update")]
        public async Task<OutcomeActWithProducts> Update(UpdateOutcomeActDTO dto)
        {
            return await _outcomeActService.Update(dto);
        }
    }
}

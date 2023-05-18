using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.Encashment;
using BikeShop.Acts.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("encashment")]
    public class EncashmentController : ControllerBase
    {
        private readonly IEncashmentService _encashmentService;

        public EncashmentController(IEncashmentService encashmentService)
        {
            _encashmentService = encashmentService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<Encashment>> GetByShop(int ShopId, int Take)
        {
            return await _encashmentService.GetByShop(ShopId, Take);
        }

        [HttpPost("create")]
        public async Task<Encashment> Create(CreateEncashmentDTO dto)
        {
            return await _encashmentService.Create(dto);
        }

        [HttpPut("setstatustotransfer")]
        public async Task<Encashment> SetStatusToTransfer(int Id, Guid UserId)
        {
            return await _encashmentService.SetStatusToTransfer(Id, UserId);
        }
        [HttpPut("setstatustofinish")]
        public async Task<Encashment> SetStatusToFinish(int Id, Guid UserId)
        {
            return await _encashmentService.SetStatusToFinish(Id, UserId);
        }
    }
}

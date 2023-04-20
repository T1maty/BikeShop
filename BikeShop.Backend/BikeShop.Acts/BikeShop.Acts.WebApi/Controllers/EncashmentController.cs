using BikeShop.Acts.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("encashment")]
    public class EncashmentController
    {
        private readonly IEncashmentService _encashmentService;

        public EncashmentController(IEncashmentService encashmentService)
        {
            _encashmentService = encashmentService;
        }

        [HttpGet("getbyshop")]
        public async Task GetByShop(int ShopId, int Take)
        {
            
        }

        [HttpPost("create")]
        public async Task Create()
        {

        }

        [HttpPut("setstatustotransfer")]
        public async Task SetStatusToTransfer(int Id, Guid UserId)
        {

        }
        [HttpPut("setstatustofinish")]
        public async Task SetStatusToFinish(int Id, Guid UserId)
        {

        }
    }
}

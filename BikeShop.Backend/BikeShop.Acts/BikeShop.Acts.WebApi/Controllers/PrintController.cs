using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("print")]
    public class PrintController : ControllerBase
    {
        private readonly IPrintService _printService;

        public PrintController(IPrintService printService)
        {
            _printService = printService;
        }

        [HttpPost("addqueue")]
        public async Task<PrintQueue> AddQueue(int actId, string dataName, string printSettings, int? prioriry, int agentId, [FromForm] IFormFile? imageFile)
        {
            return await _printService.AddQueue(actId,dataName,printSettings,prioriry,agentId,imageFile);
        }

        [HttpGet("getqueue")]
        public async Task<List<PrintQueue>> GetQueue(int AgentId)
        {
            return await _printService.GetQueue(AgentId);
        }

        [HttpDelete("deletequeue")]
        public async Task DeleteQueue(int QueueId)
        {
            await _printService.DeleteQueue(QueueId);
        }
    }
}

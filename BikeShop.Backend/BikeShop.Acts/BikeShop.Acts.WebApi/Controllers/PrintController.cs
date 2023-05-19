using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("print")]
    public class PrintController : ControllerBase
    {
        private readonly IPrintService _printService;
        private readonly PrintQueueHub _pq;
        private readonly IHubContext<PrintQueueHub> _hubContext;

        public PrintController(IPrintService printService, PrintQueueHub pq, IHubContext<PrintQueueHub> hubContext)
        {
            _printService = printService;
            _pq = pq;
            _hubContext = hubContext;
        }

        [HttpPost("addqueue")]
        public async Task<PrintQueue> AddQueue(int actId, string dataName, string printSettings, int? prioriry, int agentId, [FromForm] IFormFile? imageFile)
        {
            var ent = await _printService.AddQueue(actId, dataName, printSettings, prioriry, agentId, imageFile);
            await _pq.Trigger(await GetQueue(agentId), _hubContext);
            return ent;
        }

        [HttpPost("triggerprint")]
        public async Task Trigger(int agentId)
        {
            await  _pq.Trigger(await GetQueue(agentId), _hubContext);
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

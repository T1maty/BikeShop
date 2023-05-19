using BikeShop.Acts.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Acts.WebApi.Controllers
{
    public class PrintQueueHub:Hub
    {
        public async Task Trigger(List<PrintQueue> data, IHubContext<PrintQueueHub> _context)
        {
            await _context.Clients.All.SendAsync("UpdateQueue", data);
        }
    }
}

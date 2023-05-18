using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class PrintService : IPrintService
    {
        private readonly IApplicationDbContext _context;
        private readonly IFileserviceClient _fileservice;

        public PrintService(IApplicationDbContext context, IFileserviceClient fileservice)
        {
            _context = context;
            _fileservice = fileservice;
        }

        public async Task<PrintQueue> AddQueue(int actId, string dataName, string printSettings, int? prioriry, int agentId, IFormFile? imageFile)
        {
            if (prioriry == null) prioriry = 100;
            string url = "";
            if(imageFile == null)
            {
                var dg = await _context.ActImages.Where(n => n.ActId == actId).Where(n => n.ActType == dataName).FirstOrDefaultAsync();
                if (dg == null) throw new Exception();
                url = dg.ImageURL;
            }
            else
            {
                var img = new ActImage { ActId= actId, ActType = dataName };
                var stream = imageFile.OpenReadStream();
                var streamPart = new StreamPart(stream, imageFile.FileName, "image/jpeg");

                url = await _fileservice.AddActImage(img.Id, streamPart);
                img.ImageURL = url;

                await _context.ActImages.AddAsync(img);
            }

            var ent = new PrintQueue { AgentId = agentId, DataName = dataName, DataURL =  url, PrintSettings = printSettings, Priority = (int)prioriry};

            await _context.PrintQueues.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }

        public async Task DeleteQueue(int QueueId)
        {
            _context.PrintQueues.Remove(await _context.PrintQueues.FindAsync(QueueId));
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<PrintQueue>> GetQueue(int AgentId)
        {
            return await _context.PrintQueues.Where(n=>n.AgentId == AgentId).ToListAsync();
        }
    }
}

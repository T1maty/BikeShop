using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.Encashment;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class EncashmentService : IEncashmentService
    {
        private readonly IApplicationDbContext _context;
        private readonly IShopClient _shopClient;

        public EncashmentService(IApplicationDbContext context, IShopClient shopClient)
        {
            _context = context;
            _shopClient = shopClient;
        }

        public async Task<Encashment> Create(CreateEncashmentDTO dto)
        {
            var shop = await _shopClient.GetById(dto.ShopId);
            var ent = new Encashment { ShopId = dto.ShopId, Card = dto.Cash, Cash = dto.Cash, CashRemain = shop.CashboxCash - dto.Cash , Description = dto.Description, Status = "InShop", UserCreated = dto.UserId,  UserUpdated = dto.UserId };
            await _context.Encashments.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            try
            {
                await _shopClient.Action(dto.ShopId, "Encashment", ent.Id, dto.Cash * -1, shop.CashboxTerminal * -1);
            }
            catch (Exception e)
            {
                _context.Encashments.Remove(ent);
                await _context.SaveChangesAsync(new CancellationToken());
                throw;
            }

            return ent;
        }

        public async Task<List<Encashment>> GetByShop(int ShopId, int Take)
        {
            return await _context.Encashments.Where(n => n.ShopId == ShopId).Take(Take).ToListAsync();
        }

        public async Task<Encashment> SetStatusToFinish(int Id, Guid UserId)
        {
            var ent = await _context.Encashments.FindAsync(Id);
            ent.UpdatedAt = DateTime.Now;
            ent.UserUpdated = UserId;
            ent.Status = "Finished";
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<Encashment> SetStatusToTransfer(int Id, Guid UserId)
        {
            var ent = await _context.Encashments.FindAsync(Id);
            ent.UpdatedAt = DateTime.Now;
            ent.UserUpdated = UserId;
            ent.Status = "InTransfer";
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }
    }
}

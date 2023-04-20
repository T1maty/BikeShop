using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO.Requests.CashboxAction;
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
    public class CashboxActionService : ICashboxActionService
    {
        private readonly IApplicationDbContext _context;
        private readonly IShopClient _shopClient;

        public CashboxActionService(IApplicationDbContext context, IShopClient shopClient)
        {
            _context = context;
            _shopClient = shopClient;
        }

        public async Task<CashboxAction> Create(CreateCashboxActionDTO dto)
        {
            var ent = new CashboxAction{ Cash = dto.Cash, ShopId = dto.ShopId, UserCreated = dto.UserId, UserUpdated = dto.UserId };
            await _context.CashboxActions.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            try
            {
                await _shopClient.Action(dto.ShopId, "CashActionAct", ent.Id, dto.Cash, 0);
            }
            catch (Exception e)
            {
                _context.CashboxActions.Remove(ent);
                await _context.SaveChangesAsync(new CancellationToken());
                throw;
            }
            
            return ent;
        }

        public async Task<List<CashboxAction>> GetByShop(int ShopId, int Take)
        {
           return await _context.CashboxActions.Where(n=>n.ShopId == ShopId).Take(Take).ToListAsync();
        }
    }
}

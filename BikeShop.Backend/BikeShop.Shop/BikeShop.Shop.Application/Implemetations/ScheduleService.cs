using BikeShop.Shop.Application.Errors;
using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Application.ReficClients;
using BikeShop.Shop.Domain.DTO.RefitModels;
using BikeShop.Shop.Domain.DTO.Schedule;
using BikeShop.Shop.Domain.Entities;
using BikeShop.Shop.Domain.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Implemetations
{
    public class ScheduleService : IScheduleService
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityClient _identityClient;

        public ScheduleService(IApplicationDbContext context, IIdentityClient identityClient)
        {
            _context = context;
            _identityClient = identityClient;
        }

        public async Task<ResponseScheduleWithHistory> CreateHolydayItem(CreateHolydayItemDTO dto)
        {
            if ((await _context.ScheduleItems.Where(n => n.ShopId == dto.ShopId).Where(n => n.TimeStart > dto.Date).Where(n => n.TimeFinish < dto.Date.AddDays(1)).ToListAsync()).Count > 0) throw ScheduleErrors.ShiftAlreadyExist;

            var date = dto.Date.Date;
            
            var userFIO = FIOFromUser(await _identityClient.GetById(dto.User));
            var userTargetFIO = FIOFromUser(await _identityClient.GetById(dto.User));
            var ent = new ScheduleItem { ShopId = dto.ShopId, IsHolyday = true, CreatedUser = dto.User, CreatedUserFIO = userFIO, Role = "", TargetUser = dto.TargetUser, TargetUserFIO = userTargetFIO, 
                TimeStart = date, TimeFinish = date, UpdatedUser = dto.User, UpdatedUserFIO = userFIO
            };

            await _context.ScheduleItems.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            var hist = new ScheduleHistory { ShopId = dto.ShopId, Action = ScheduleHistoryAction.AddHolyday.ToString(), ActionTargetUser= dto.TargetUser, ActionTargetUserFIO = userTargetFIO, ActionUser = dto.User, ActionUserFIO = userFIO, IsHolydayActual = true, IsHolydayPrev = false, ItemId = ent.Id, TimeStartActual = date, TimeFinishActual = date };
            await _context.ScheduleHistories.AddAsync(hist);
            await _context.SaveChangesAsync(new CancellationToken());
            
            return new ResponseScheduleWithHistory { ScheduleHistory = hist, ScheduleItem = ent};
        }

        public async Task<ResponseScheduleWithHistory> CreateScheduleItem(CreateScheduleItemDTO dto)
        {
            if ((await _context.ScheduleItems.Where(n => n.ShopId == dto.ShopId).Where(n => n.TimeStart > dto.Start.Date).Where(n => n.TimeFinish < dto.Finish.Date.AddDays(1)).ToListAsync()).Count > 0) throw ScheduleErrors.ShiftAlreadyExist;

            var userFIO = FIOFromUser(await _identityClient.GetById(dto.User));
            var userTargetFIO = FIOFromUser(await _identityClient.GetById(dto.User));
            var ent = new ScheduleItem
            {
                ShopId = dto.ShopId,
                IsHolyday = false,
                CreatedUser = dto.User,
                CreatedUserFIO = userFIO,
                Role = dto.Role,
                TargetUser = dto.TargetUser,
                TargetUserFIO = userTargetFIO,
                TimeStart = dto.Start,
                TimeFinish = dto.Finish,
                UpdatedUser = dto.User,
                UpdatedUserFIO = userFIO
            };

            await _context.ScheduleItems.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            var hist = new ScheduleHistory { ShopId = dto.ShopId, Action = ScheduleHistoryAction.AddShift.ToString(), ActionTargetUser = dto.TargetUser, ActionTargetUserFIO = userTargetFIO, ActionUser = dto.User, ActionUserFIO = userFIO, IsHolydayActual = true, IsHolydayPrev = false, ItemId = ent.Id, TimeStartActual = dto.Start, TimeFinishActual = dto.Finish };
            await _context.ScheduleHistories.AddAsync(hist);
            await _context.SaveChangesAsync(new CancellationToken());

            return new ResponseScheduleWithHistory { ScheduleHistory = hist, ScheduleItem = ent };
        }

        public async Task<ScheduleDTO> GetByShop(int shopId, DateTime? Start, DateTime? Finish)
        {
            var shop = await _context.Shops.FindAsync(shopId);
            if (shop == null) { throw ScheduleErrors.ShopScheduleNotFount; }
            if (Start == null) Start = DateTime.Now.AddDays(-15);
            if (Finish == null) Finish = DateTime.Now.AddDays(15);

            var ScheduleHistories = await _context.ScheduleHistories.Where(n=>n.ShopId == shopId).Where(n => n.TimeStartActual >= Start || n.TimeStartPrev >= Start).Where(n => n.TimeFinishActual <= Finish || n.TimeFinishPrev <= Finish).ToListAsync();
            var ScheduleItems = await _context.ScheduleItems.Where(n => n.ShopId == shopId).Where(n => n.TimeStart >= Start).Where(n => n.TimeFinish <= Finish).ToListAsync();


            return new ScheduleDTO { ShopId = shopId, ShopName = shop.Name, Start = (DateTime)Start, Finish = (DateTime)Finish , ScheduleHistories = ScheduleHistories, ScheduleItems  = ScheduleItems };
        }

        public async Task<ScheduleHistory> RemoveScheduleItem(Guid User, int ItemId)
        {
            var item = await _context.ScheduleItems.FindAsync(ItemId);
            if (item == null) throw ScheduleErrors.ScheduleItemNotFount;
            if (item.TimeStart < DateTime.Now) throw ScheduleErrors.RemovingOfStartedShift;
            
            var targerUser = item.TargetUser;
            var userFIO = FIOFromUser(await _identityClient.GetById(User));
            var userTargetFIO = FIOFromUser(await _identityClient.GetById(targerUser));

            _context.ScheduleItems.Remove(item);

            var hist = new ScheduleHistory {ShopId = item.ShopId, Action = item.IsHolyday ? ScheduleHistoryAction.RemoveHolyday.ToString() : ScheduleHistoryAction.RemoveShift.ToString(), ActionTargetUser = item.TargetUser, ActionTargetUserFIO = userTargetFIO, ActionUser = User, ActionUserFIO = userFIO, IsHolydayActual = item.IsHolyday, IsHolydayPrev = false, ItemId = item.Id, TimeStartPrev = item.TimeStart, TimeFinishPrev = item.TimeFinish };
            await _context.ScheduleHistories.AddAsync(hist);
            await _context.SaveChangesAsync(new CancellationToken());

            return hist;
        }

        private static string FIOFromUser(User user)
        {
            return user.lastName + " " + user.firstName + " " + user.patronymic;
        }
    }
}

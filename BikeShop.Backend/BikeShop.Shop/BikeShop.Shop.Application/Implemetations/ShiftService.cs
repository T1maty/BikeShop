using BikeShop.Shop.Application.Errors;
using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Shift;
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
    public class ShiftService : IShiftService
    {
        private readonly IApplicationDbContext _context;

        public ShiftService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserShiftItem> FinishShift(Guid UserId)
        {
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();
            
            if (lastItem == null) throw ShiftErrors.LastActionNotFound;
            if (lastItem.Action != ShiftStatus.Open) throw ShiftErrors.ShiftOpenningNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Finish };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            return item;
        }

        public async Task<TimeSpan> GetHours(Guid UserId, DateTime Start, DateTime Stop)
        {
            if (Stop == DateTime.MinValue) { Stop = DateTime.Now; }

            var items = await _context.UserShiftItems.Where(n => n.Enabled == true)
                                                     .Where(n => n.UserId == UserId)
                                                     .Where(n => n.Time > Start)
                                                     .Where(n => n.Time < Stop)
                                                     .OrderBy(n => n.Time)
                                                     .ToListAsync();
            var result = new TimeSpan(0);

            if(items.FirstOrDefault()!= null && items.FirstOrDefault().Action != ShiftStatus.Open && items.FirstOrDefault().Time.Date == Start.Date) 
                result = result.Add(items.FirstOrDefault().Time - Start);

            for (int i = 0; i < items.Count-1; i++)
            {
                if (items[i + 1].Time.Date == items[i].Time.Date)
                {
                    var spn = items[i + 1].Time - items[i].Time;
                    result = result.Add(spn);
                }
            }

            var t = items.FirstOrDefault().Time.Date;
            var t2 = DateTime.Now.Date;
            if (items.LastOrDefault()!=null&&items.LastOrDefault().Action == ShiftStatus.Open && items.LastOrDefault().Time.Date == DateTime.Now.Date) 
                result = result.Add(DateTime.Now - items.LastOrDefault().Time);

            return result;
        }

        public async Task<UserShiftStatusDTO> GetUserStatus(Guid UserId)
        {
            var data = new UserShiftStatusDTO();
            var lastAction = await _context.UserShiftItems.Where(n => n.UserId == UserId).OrderByDescending(n => n.Time).FirstOrDefaultAsync();
            if (lastAction == null) throw ShiftErrors.LastActionNotFound;
            data.LastAction = lastAction;
            data.Hours = await GetHours(UserId, DateTime.MinValue, DateTime.Now);
            data.Schedule = await _context.ShopScheduleItems.Where(n=>n.UserId == UserId).Where(n=>n.Start.Date == DateTime.Now.Date).FirstOrDefaultAsync();
            return data;
        }

        public async Task<UserShiftItem> PauseShift(Guid UserId)
        {
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();

            if (lastItem == null) throw ShiftErrors.LastActionNotFound;
            if (lastItem.Action != ShiftStatus.Open) throw ShiftErrors.ShiftOpenningNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Pause };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            return item;
        }

        public async Task<UserShiftItem> ResumeShift(Guid UserId)
        {
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();

            if (lastItem == null) throw ShiftErrors.LastActionNotFound;
            if (lastItem.Action != ShiftStatus.Pause) throw ShiftErrors.ShiftPauseNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Open };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            return item;
        }

        public async Task<UserShiftItem> StartShift(Guid UserId)
        {
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();

            if (lastItem!=null && lastItem.Action != ShiftStatus.Finish) throw ShiftErrors.ShiftFinishNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Open };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            return item;
        }
    }
}

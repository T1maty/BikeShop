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
            await UpdateScheduleShift(UserId, item.CreatedAt.Date);
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

            if(items.Count == 0) return new TimeSpan(0);
            var result = new TimeSpan(0);

            var firstItem = items.FirstOrDefault();
            if (firstItem.Action != ShiftStatus.Open)
            {
                var prev = await _context.UserShiftItems.Where(n => n.Enabled == true)
                                                     .Where(n => n.UserId == UserId)
                                                     .OrderByDescending(n => n.Time)
                                                     .Where(n => n.Time < firstItem.Time)
                                                     .FirstOrDefaultAsync();

                if (prev != null && prev.Action == ShiftStatus.Open && prev.Time.Date == Start.Date) result.Add(firstItem.Time - Start);
            }



            var openningItems = items.Where(n => n.Action == ShiftStatus.Open);

            foreach (var i in openningItems)
            {
                var index = items.IndexOf(i);
                if (!(items.Count <= index + 1))
                {
                    var closeItem = items[index + 1];
                    if (closeItem.Action == ShiftStatus.Pause || closeItem.Action == ShiftStatus.Finish)
                    {
                        result.Add(closeItem.Time - i.Time);
                    }
                }
            }

            var lastItem = items.LastOrDefault();
            if (lastItem.Action == ShiftStatus.Open && lastItem.Time.Date == DateTime.Now.Date) 
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
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n => n.Time.Date == DateTime.Now.Date).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();

            if (lastItem == null) throw ShiftErrors.NoShiftsToday;
            if (lastItem.Action != ShiftStatus.Open) throw ShiftErrors.ShiftOpenningNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Pause };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            await UpdateScheduleShift(UserId, item.CreatedAt.Date);
            return item;
        }

        public async Task<UserShiftItem> ResumeShift(Guid UserId)
        {
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n => n.Time.Date == DateTime.Now.Date).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();

            if (lastItem == null) throw ShiftErrors.NoShiftsToday;
            if (lastItem.Action != ShiftStatus.Pause) throw ShiftErrors.ShiftPauseNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Open };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            await UpdateScheduleShift(UserId, item.CreatedAt.Date);
            return item;
        }

        public async Task<UserShiftItem> StartShift(Guid UserId)
        {
            var lastItem = await _context.UserShiftItems.Where(n => n.UserId == UserId).Where(n=>n.Time.Date == DateTime.Now.Date).Where(n => n.Enabled == true).OrderByDescending(n => n.Time).FirstOrDefaultAsync();

            if (lastItem!=null && lastItem.Action != ShiftStatus.Finish) throw ShiftErrors.ShiftFinishNotFound;

            var item = new UserShiftItem { UserId = UserId, Action = ShiftStatus.Open };
            await _context.UserShiftItems.AddAsync(item);
            await _context.SaveChangesAsync(new CancellationToken());
            await UpdateScheduleShift(UserId, item.CreatedAt.Date);
            return item;
        }

        public async Task UpdateScheduleShift(Guid UserId, DateTime updateDate)
        {
            var item = await _context.ScheduleItems.Where(n => n.TargetUser == UserId).Where(n => n.TimeStart.Date == updateDate.Date).FirstOrDefaultAsync();
            if (item != null) return;

            var shifts = await _context.UserShiftItems.Where(n => n.Time.Date == updateDate.Date).OrderBy(n=>n.Time).ToListAsync();

            var firstStart = shifts.Where(n => n.Action == ShiftStatus.Open).FirstOrDefault();
            var lastFinish = shifts.Where(n => n.Action == ShiftStatus.Finish).FirstOrDefault();
            var span = new TimeSpan(0);

            var openItems = shifts.Where(n => n.Action == ShiftStatus.Open);
            foreach (var i in openItems)
            {
                var index = shifts.IndexOf(i);
                if (shifts.Count <= index + 1) return;
                var closeItem = shifts[index + 1];
                if (closeItem.Action == ShiftStatus.Pause || closeItem.Action == ShiftStatus.Finish)
                {
                    span.Add(closeItem.Time - i.Time);
                }
            }

            if(firstStart != null) item.ShiftFirstStart = firstStart.Time;
            if (lastFinish != null) item.ShiftLastFinish = lastFinish.Time;
            item.FinishedSpan = span;
            if (shifts.Count > 0) item.ShiftStatus = shifts.Last().Action;

        }
    }
}

using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Domain.DTO.Shift;
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

        public async Task<UserShiftStatusDTO> GetUserStatus(Guid UserId)
        {
            var data = new UserShiftStatusDTO();
            data.LastAction = await _context.UserShiftItems.Where(n=>n.UserId == UserId).OrderBy(n => n.Time).FirstAsync();
            data.Schedule = await _context.ShopScheduleItems.Where(n=>n.UserId == UserId).Where(n=>n.Start.Date == DateTime.Now.Date).FirstOrDefaultAsync();
            return data;
        }
    }
}

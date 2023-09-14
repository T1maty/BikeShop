using BikeShop.Shop.Domain.DTO.Schedule;
using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Interfaces
{
    public interface IScheduleService
    {
        public Task<ScheduleDTO> GetByShop(int shopId, DateTime? Start, DateTime? Finish);
        public Task<ResponseScheduleWithHistory> CreateScheduleItem(CreateScheduleItemDTO dto);
        public Task<ResponseScheduleWithHistory> CreateHolydayItem(CreateHolydayItemDTO dto);
        public Task<ScheduleHistory> RemoveScheduleItem(Guid User, int ItemId);
    }
}

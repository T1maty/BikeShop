using BikeShop.Shop.Domain.DTO.Shift;
using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Interfaces
{
    public interface IShiftService
    {
        public Task<UserShiftStatusDTO> GetUserStatus(Guid UserId);
        public Task<UserShiftItem> StartShift(Guid UserId);
        public Task<UserShiftItem> FinishShift(Guid UserId);
        public Task<UserShiftItem> PauseShift(Guid UserId);
        public Task<UserShiftItem> ResumeShift(Guid UserId);
        public Task<TimeSpan> GetHours(Guid UserId, DateTime Start, DateTime Stop);
    }
}

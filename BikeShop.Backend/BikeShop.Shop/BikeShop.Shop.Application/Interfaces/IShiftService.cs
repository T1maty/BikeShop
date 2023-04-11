using BikeShop.Shop.Domain.DTO.Shift;
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

    }
}

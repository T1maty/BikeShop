using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Shift
{
    public class UserShiftStatusDTO
    {
        public UserShiftItem LastAction { get; set; }
        public TimeSpan Hours { get; set; }
        public DateTime StartDate { get; set; }
        public ShopScheduleItem Schedule { get; set; }
    }
}

using BikeShop.Shop.Domain.Entities;
using BikeShop.Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Schedule
{
    public class ScheduleDTO
    {
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public List<ScheduleItem> ScheduleItems { get; set; }
        public List<ScheduleHistory> ScheduleHistories { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
    }
}

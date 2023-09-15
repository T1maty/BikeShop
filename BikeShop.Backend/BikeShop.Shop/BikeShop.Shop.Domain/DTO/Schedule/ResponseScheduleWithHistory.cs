using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Schedule
{
    public class ResponseScheduleWithHistory
    {
        public ScheduleItem ScheduleItem { get; set; }
        public ScheduleHistory ScheduleHistory { get; set; }
    }
}

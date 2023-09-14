using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Schedule
{
    public class CreateScheduleItemDTO
    {
        public Guid User { get; set; }
        public Guid TargetUser { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
        public string Role { get; set; }
    }
}

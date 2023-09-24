using BikeShop.Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Entities
{
    public class ScheduleItem : BaseEntity
    {
        public string Role { get; set; }
        public bool IsHolyday { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeFinish { get; set; }
        public Guid TargetUser { get; set; }
        public string TargetUserFIO { get; set; }
        public Guid CreatedUser { get; set; }
        public string CreatedUserFIO { get; set; }
        public Guid UpdatedUser { get; set; }
        public string UpdatedUserFIO { get; set; }
        public int ShopId { get; set; }

        public DateTime? ShiftFirstStart { get; set; } = null;
        public DateTime? ShiftLastFinish { get; set; } = null;
        public TimeSpan? FinishedSpan { get; set; } = null;
        public string ShiftStatus { get; set; } = "Waiting";
    }
}

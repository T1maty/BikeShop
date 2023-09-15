using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Entities
{
     public class ScheduleHistory : BaseEntity
    {
        public string Action { get; set; }
        public Guid ActionUser { get; set; }
        public string ActionUserFIO { get; set; }
        public Guid ActionTargetUser { get; set; }
        public string ActionTargetUserFIO { get; set; }

        public bool IsHolydayPrev { get; set; }
        public DateTime TimeStartPrev { get; set; } = new DateTime();
        public DateTime TimeFinishPrev { get; set; } = new DateTime();

        public bool IsHolydayActual { get; set; }
        public DateTime TimeStartActual { get; set; }=  new DateTime();
        public DateTime TimeFinishActual { get; set; } = new DateTime();

        public int ItemId { get; set; }
        public int ShopId { get; set; }
    }
}

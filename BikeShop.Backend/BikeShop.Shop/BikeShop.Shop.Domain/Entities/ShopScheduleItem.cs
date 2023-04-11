using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Entities
{
    public class ShopScheduleItem:BaseEntity
    {
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
        public TimeSpan PreStartInaccuracy { get; set; } = TimeSpan.Zero;
        public TimeSpan PostStartInaccuracy { get; set; } = TimeSpan.Zero;
        public TimeSpan PreFinishInaccuracy { get; set; } = TimeSpan.Zero;
        public TimeSpan PostFinishInaccuracy { get; set; } = TimeSpan.Zero;

        public Guid UserId { get; set; }
        public int ShopId { get; set; }
        public string Status { get; set; }


    }
}

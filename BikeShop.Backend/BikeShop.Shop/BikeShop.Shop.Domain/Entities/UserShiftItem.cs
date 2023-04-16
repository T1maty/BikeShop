using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Entities
{
    public class UserShiftItem:BaseEntity
    {
        public Guid UserId { get; set; }
        public string Action { get; set; }
        public DateTime Time { get; set; } = DateTime.Now;
    }
}

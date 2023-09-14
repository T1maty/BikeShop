using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Schedule
{
    public class CreateHolydayItemDTO
    {
        public Guid User { get; set; }
        public Guid TargetUser { get; set; }
        public DateTime Date { get; set; }
    }
}

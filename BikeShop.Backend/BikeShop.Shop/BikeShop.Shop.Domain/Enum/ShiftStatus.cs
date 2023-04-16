using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.Enum
{
    public static class ShiftStatus
    {
        public static string Open { get; set; } = "Open";
        public static string Finish { get; set; } = "Finish";
        public static string Pause { get; set; } = "Pause";
    }
}

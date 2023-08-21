using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Statistic
{
    public class BaseStatisticDTO
    {
        public decimal WorksService { get; set; }
        public decimal SalesService { get; set; }

        public decimal TotalWorkshop { get; set; }
        public decimal TotalShop { get; set; }

        public decimal Total { get; set; }
    }
}

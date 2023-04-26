using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Salary
{
    public class CalculateSalary
    {
        public Guid UserId { get; set; }

        public decimal Rate { get; set; }
        public TimeSpan Hours { get; set; }
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodFinish { get; set; }
        public decimal ShopPercent { get; set; }
        public int Bills { get; set; }
        public decimal WorkPercent { get; set; }
        public int Services { get; set; }
        public int Works { get; set; }
        public int Products { get; set; }
        public decimal WorkshopPercent { get; set; }
    }
}

using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Service.Domain.Entities;
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

        public DateTime PeriodStart { get; set; }
        public DateTime PeriodFinish { get; set; }

        public decimal Rate { get; set; }
        public TimeSpan Hours { get; set; }
        public decimal TotalHours { get; set; }

        public decimal BillsTotal { get; set; }
        public decimal ProductsTotal { get; set; }
        public decimal WorkTotal { get; set; }

        public List<BillWithProducts> Bills { get; set; }
        public List<ServiceWork> ServiceWorks { get; set; }
        public List<ServiceProduct> SeviceProducts { get; set; }

        
    }
}

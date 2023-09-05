using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Service.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.Statistic
{
    public class BaseStatisticDTO
    {
        public List<ServiceWork> AllWorks { get; set; }
        public List<ServiceProduct> AllWSProducts { get; set; }
        public List<BillWithProducts> AllBills { get; set; }
        public decimal WorksService { get; set; }
        public decimal SalesService { get; set; }

        public decimal TotalWorkshop { get; set; }
        public decimal TotalShop { get; set; }

        public decimal Total { get; set; }
    }
}

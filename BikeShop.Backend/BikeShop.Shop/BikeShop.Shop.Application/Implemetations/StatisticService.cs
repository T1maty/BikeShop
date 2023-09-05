using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Application.ReficClients;
using BikeShop.Shop.Domain.DTO.Statistic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.Implemetations
{
    public class StatisticService : IStatisticService
    {
        private readonly IApplicationDbContext _context;
        private readonly IServiceClient _serviceClient;
        private readonly IPaymentClient _paymentClient;

        public StatisticService(IApplicationDbContext context, IServiceClient serviceClient, IPaymentClient paymentClient)
        {
            _context = context;
            _serviceClient = serviceClient;
            _paymentClient = paymentClient;
        }

        public async Task<BaseStatisticDTO> Basic(DateTime Start, DateTime Finish)
        {
             
            var works = await _serviceClient.GetWorksByMaster(null, Start, Finish);
            var prods = await _serviceClient.GetProductsByMaster(null, Start, Finish);

            var bills = await _paymentClient.GetBillsByUser(null, Start, Finish);

            var salesService = prods.Select(n => n.Total).Sum();
            var workService = works.Select(n => n.Total).Sum();
            var totalWS = salesService + workService;
            var totalShop = bills.Select(n => n.bill.Total).Sum();

            var res = new BaseStatisticDTO { AllBills = bills, AllWorks = works, AllWSProducts=prods, SalesService = salesService, WorksService = workService, TotalWorkshop = totalWS, TotalShop = totalShop, Total = totalShop + totalWS };

            return res;
        }
    }
}

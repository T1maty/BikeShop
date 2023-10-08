using BikeShop.Acts.Domain.Refit;
using BikeShop.Acts.Domain.Refit.Bill;
using BikeShop.Products.Domain.DTO.Responses;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Refit
{
    public interface IPaymentsClient
    {
        [Get("/financialinteraction/getbill")]
        public Task<BillWithProducts> GetBill(int BillId);

        [Get("/currency/get")]
        public Task<Currency> GetCurrency(int Id);
    }
}

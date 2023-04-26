using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Service.Domain.Entities;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.ReficClients
{
    public interface IPaymentClient
    {
        [Get("/financialinteraction/getbillsbyuser")]
        public Task<List<BillWithProducts>> GetBillsByUser(Guid UserId, DateTime Start, DateTime Finish);
    }
}

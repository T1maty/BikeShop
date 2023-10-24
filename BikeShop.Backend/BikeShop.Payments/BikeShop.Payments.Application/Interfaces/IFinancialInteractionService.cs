using BikeShop.Payments.Domain.DTO.Refit.Checkbox;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.DTO.Requests.Payment;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables.PaymentEnums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Interfaces
{
    public interface IFinancialInteractionService
    {
        public Task<BillWithProducts> NewBill(NewBillDTO dto);
        public Task<List<BillWithProducts>> GetBillsByUser(Guid? UserId, DateTime Start, DateTime Finish);
        public Task<List<BillWithProducts>> GetBillsByShop(int ShopId, int Take);
        public Task<byte[]> Test();
        public Task<BillWithProducts> GetBill(int BillId);

        public Task<Payment> ReplenishUserBalance(AddPaymentDTO dto, Guid ClientId, PaymentSource Source, Guid? UserId, int ShopId = 0, int TargetId = 0);
    }
}

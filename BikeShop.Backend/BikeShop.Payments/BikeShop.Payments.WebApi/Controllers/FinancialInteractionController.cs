using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Refit.Checkbox;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.DTO.Requests.Payment;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Payments.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("financialinteraction")]
    public class FinancialInteractionController : ControllerBase
    {
        private readonly IFinancialInteractionService _interactionService;

        public FinancialInteractionController(IFinancialInteractionService interactionService)
        {
            _interactionService = interactionService;
        }

        [HttpPost("newbill")]
        public async Task<BillWithProducts> NewBill(NewBillDTO dto)
        {
            return await _interactionService.NewBill(dto);
        }

        [HttpGet("getbill")]
        public async Task<BillWithProducts> GetBill(int BillId)
        {
            return await _interactionService.GetBill(BillId);
        }

        [HttpGet("getbillsbyuser")]
        public async Task<List<BillWithProducts>> GetBillsByUser(Guid? UserId, DateTime Start, DateTime Finish)
        {
            return await _interactionService.GetBillsByUser(UserId, Start, Finish);
        }

        [HttpGet("getbillsbyshop")]
        public async Task<List<BillWithProducts>> GetBillsByShop(int ShopId, int Take)
        {
            return await _interactionService.GetBillsByShop(ShopId, Take);
        }

        [HttpPost("replenishuserbalance")]
        public async Task<Payment> ReplenishUserBalance(ReplenishUserBalanceDTO dto)
        {
            return await _interactionService.ReplenishUserBalance(dto.Payment, dto.ClientId, Domain.Enumerables.PaymentEnums.PaymentSource.Shop, dto.UserId, dto.ShopId);
        }

        [HttpGet("test")]
        public async Task<byte[]> Test()
        {
            return await _interactionService.Test();
        }
    }
}

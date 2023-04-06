using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests;
using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("supplyinvoice")]
    public class SupplyInvoiceController
    {
        private readonly ISupplyInvoiceService _supplyInvoiceService;

        public SupplyInvoiceController(ISupplyInvoiceService supplyInvoiceService)
        {
            _supplyInvoiceService = supplyInvoiceService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<SupplyInvoiceWithProducts>> GetByShop(int id, int take)
        {
            return await _supplyInvoiceService.GetByShop(id, take);
        }

        [HttpPost("create")]
        public async Task<SupplyInvoiceWithProducts> Create(CreateSupplyInvoiceDTO dto)
        {
            return await _supplyInvoiceService.Create(dto);
        }

        [HttpPost("execute")]
        public async Task Execute(int invoiceId, Guid userId)
        {
            await _supplyInvoiceService.Execute(invoiceId, userId);
        }
    }
}

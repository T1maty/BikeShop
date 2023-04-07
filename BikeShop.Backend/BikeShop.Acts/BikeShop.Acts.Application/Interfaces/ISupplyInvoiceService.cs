using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Create;
using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface ISupplyInvoiceService
    {
        public Task<List<SupplyInvoiceWithProducts>> GetByShop(int id, int take);
        public Task<SupplyInvoiceWithProducts> Create(CreateSupplyInvoiceDTO dto);
        public Task<SupplyInvoiceWithProducts> Update(UpdateSupplyInvoiceDTO dto);
        public Task Execute(int invoiceId, Guid userId);

    }
}

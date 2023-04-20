using BikeShop.Acts.Domain.DTO.Requests.CashboxAction;
using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface ICashboxActionService
    {
        public Task<List<CashboxAction>> GetByShop(int ShopId, int Take);
        public Task<CashboxAction> Create(CreateCashboxActionDTO dto);
    }
}

using BikeShop.Acts.Domain.DTO.Requests.Payout;
using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IPayoutService
    {
        public Task<Payout> Create(CreatePayoutDTO dto);
        public Task<List<Payout>> Get(int Take);
    }
}

using BikeShop.Acts.Domain.DTO.Requests.Encashment;
using BikeShop.Acts.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IEncashmentService
    {
        public Task<List<Encashment>> GetByShop(int ShopId, int Take);
        public Task<Encashment> Create(CreateEncashmentDTO dto);
        public Task<Encashment> SetStatusToTransfer(int Id, Guid UserId);
        public Task<Encashment> SetStatusToFinish(int Id, Guid UserId);
    }
}

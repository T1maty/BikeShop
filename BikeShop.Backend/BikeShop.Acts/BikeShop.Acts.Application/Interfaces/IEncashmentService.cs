using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IEncashmentService
    {
        public Task GetByShop(int ShopId, int Take);
        public Task Create();
        public Task SetStatusToTransfer(int Id, Guid UserId);
        public Task SetStatusToFinish(int Id, Guid UserId);
    }
}

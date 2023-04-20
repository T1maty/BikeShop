using BikeShop.Acts.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class EncashmentService : IEncashmentService
    {
        public Task Create()
        {
            throw new NotImplementedException();
        }

        public Task GetByShop(int ShopId, int Take)
        {
            throw new NotImplementedException();
        }

        public Task SetStatusToFinish(int Id, Guid UserId)
        {
            throw new NotImplementedException();
        }

        public Task SetStatusToTransfer(int Id, Guid UserId)
        {
            throw new NotImplementedException();
        }
    }
}

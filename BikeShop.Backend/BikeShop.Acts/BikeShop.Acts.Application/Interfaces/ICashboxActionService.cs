using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface ICashboxActionService
    {
        public Task GetByShop(int ShopId, int Take);
        public Task Create();
    }
}

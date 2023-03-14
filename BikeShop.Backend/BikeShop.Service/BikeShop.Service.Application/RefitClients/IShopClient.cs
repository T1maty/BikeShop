using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.RefitClients
{
    public interface IShopClient
    {
        [Get("/shop/getstorageid")]
        public Task<int> GetStorageId(int ShopId);
    }
}

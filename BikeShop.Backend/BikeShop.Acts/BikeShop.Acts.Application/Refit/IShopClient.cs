using BikeShop.Acts.Domain.Refit;
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

        [Post("/cashbox/action")]
        public Task Action(int ShopId, string Source, int SourceId, decimal CashAction, decimal TerminalAction);

        [Get("/shop/getbyid")]
        public Task<Shop> GetById(int ShopId);
    }
}

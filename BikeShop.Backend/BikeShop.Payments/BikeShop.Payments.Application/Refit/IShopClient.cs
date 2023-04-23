using Refit;

namespace BikeShop.Service.Application.RefitClients
{
    public interface IShopClient
    {
        [Get("/shop/getstorageid")]
        public Task<int> GetStorageId(int ShopId);

        [Post("/cashbox/action")]
        public Task Action(int ShopId, string Source, int SourceId, decimal CashAction, decimal TerminalAction);
    }
}

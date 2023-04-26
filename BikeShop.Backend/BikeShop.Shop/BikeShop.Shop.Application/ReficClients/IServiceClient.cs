using BikeShop.Service.Domain.Entities;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Application.ReficClients
{
    public interface IServiceClient
    {
        [Get("/service/getworksbymaster")]
        public Task<List<ServiceWork>> GetWorksByMaster(Guid userId);

        [Get("/service/getproductsbymaster")]
        public Task<List<ServiceProduct>> GetProductsByMaster(Guid userId);
    }
}

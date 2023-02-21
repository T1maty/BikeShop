using BikeShop.Service.Domain.Entities;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.RefitClients
{
    public interface IProductsClient
    {
        [Post("/product/getbyIds")]
        public Task<List<Product>> GetProductsByIdsArray(List<int> Ids);


    }
}

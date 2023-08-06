using BikeShop.Acts.Domain.Refit;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Refit
{
    public interface IProductClient
    {
        [Post("/storage/addproductstostorage")]
        public Task AddProductsToStorage(List<ProductQuantitySmplDTO> products, int storageId, string source, int sourceId);

        [Get("/storage/getbystorage")]
        public Task<StorageProductsDTO> GetByStorage(int storageId);

        [Post("/storage/getbystorage")]
        public Task<List<Product>> GetProductsByIdsArray(List<int> Ids);

        [Get("getall")]
        public Task<List<QuantityUnit>> GetAllQuantityUnits();

    }
}

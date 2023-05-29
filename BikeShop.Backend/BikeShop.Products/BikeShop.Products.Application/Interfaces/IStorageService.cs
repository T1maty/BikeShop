using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IStorageService
    {
        public Task<List<StorageProductsDTO>> GetByIds(List<int> Ids);
        public Task<StorageProductsDTO> GetByStorage(int storageId);

        public Task AddProductsToStorage(List<ProductQuantitySmplDTO> products, int storageId, string source, int sourceId);

        public Task UpdateReservationProducts(List<ProductQuantitySmplDTO> OldReservationProducts, List<ProductQuantitySmplDTO> NewReservationProducts, int storageId);
        public Task<string> GetFromBRUA();
        public Task<List<ProductStorageQuantity>> GetIdByStorage(int storageId);
        public Task<string> AITemplate();

    }
}

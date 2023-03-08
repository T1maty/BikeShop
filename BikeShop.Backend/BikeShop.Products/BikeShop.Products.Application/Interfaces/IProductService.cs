using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;

namespace BikeShop.Products.Application.Interfaces;

public interface IProductService
{

    public Task<List<Product>> GetProductsByIdsArray(List<int> Ids);
    public Task<List<ProductQuantityDTO>> GetProductsByTags(string tagsIds, int storageId);
}
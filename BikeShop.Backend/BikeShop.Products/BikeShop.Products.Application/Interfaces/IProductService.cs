using BikeShop.Products.Domain.Entities;

namespace BikeShop.Products.Application.Interfaces;

public interface IProductService
{
    public Task<List<Product>> GetProductsByIdsArray(List<int> Ids);
}
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Requestes.Product;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace BikeShop.Products.Application.Interfaces;

public interface IProductService
{

    public Task<List<Product>> GetProductsByIdsArray(List<int> Ids);
    public Task<List<Product>> GetProductsByTags(string tagsIds, int Take);

    public Task<ProductImg> AddImageToProduct(int productId, IFormFile imageFile);
    public Task DeleteImage(int imageId);
    public Task<ProductImg> UpdateImage(ProductImageDTO dto);
    public Task<List<ProductQuantityDTO>> GetUnsorted(int srorageId);
    public Task<Product> UpdatePrices(UpdateProductPriceDTO dto);
    public Task<List<Product>> Search(string querry);
    public Task<Product> Update(UpdateProductDTO dto);
    public Task<Product> Create(CreateProductDTO dto);
}
using BikeShop.Products.Domain.DTO.Requestes.Public;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Public;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IPublicService
    {
        public Task<List<ProductCategory>> GetCategories();
        public Task<PublicProductSearchResponse> Serch(PublicProductSearchRequest dto);
        public Task<PublicProductByCategoryResponse> GetProducts(PublicProductByCategoryRequest dto);
        public Task<ProductCardDTO> getProductCard(int productId);
    }
}

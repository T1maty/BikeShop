using BikeShop.Products.Domain.DTO.Responses;
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
        public Task<List<ProductTag>> GetTags();
        public Task<List<ProductCardDTO>> DefaultProducts(int Quantity);
        public Task<List<Product>> Serch(string querry);
        public Task<List<ProductCardDTO>> GetProducts(List<int> ids);

        public Task<List<ProductCardDTO>> getCards(List<Product> products);
        public Task<ProductCardDTO> getProductCard(int Id);
    }
}

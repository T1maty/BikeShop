using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Requestes.Option;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Option;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IProductCardService
    {
        public Task<ProductCardDTO> GetProductCard(int productId);
        public Task<ProductCardDTO> UpdateProductCard(UpdateProductCardDTO dto);

        public Task<List<OptionDTO>> GetAllOptions();
        public Task<OptionDTO> CreateOption(CreateOptionDTO dto);
        public Task<OptionDTO> UpdateOption(UpdateOptionDTO dto);

        public Task<List<Specification>> GetAllSpecifications();
        public Task<Specification> CreateSpecification(string name);
        public Task<Specification> UpdateSpecification(UpdateSpecificationDTO dto);
    }
}

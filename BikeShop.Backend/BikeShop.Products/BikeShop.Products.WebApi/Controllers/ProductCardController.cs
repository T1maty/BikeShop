using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Requestes.Filters;
using BikeShop.Products.Domain.DTO.Requestes.Option;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Option;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("productcard")]
    public class ProductCardController : ControllerBase
    {
        private readonly IProductCardService _productCardService;

        public ProductCardController(IProductCardService productCardService)
        {
            _productCardService = productCardService;
        }

        [HttpGet("getproductcard")]
        public async Task<ProductCardDTO> GetProductCard(int productId)
        {
            return await _productCardService.GetProductCard(productId);
        }


        [HttpPut("updateproductcard")]
        public async Task<ProductCardDTO> UpdateProductCard(UpdateProductCardDTO dto)
        {
            return await _productCardService.UpdateProductCard(dto);
        }

        //Options

        [HttpGet("getalloptions")]
        public async Task<List<OptionDTO>> GetAllOptions()
        {
            return await _productCardService.GetAllOptions();
        }

        [HttpPost("createoption")]
        public async Task<OptionDTO> CreateOption(CreateOptionDTO dto)
        {
            return await _productCardService.CreateOption(dto);
        }

        [HttpPut("updateoption")]
        public async Task<OptionDTO> UpdateOption(UpdateOptionDTO dto)
        {
            return await _productCardService.UpdateOption(dto);
        }

        [HttpPut("addoptionvariant")]
        public async Task<OptionDTO> AddOptionVariant(int optionId, string name)
        {
            return await _productCardService.AddOptionVariant(optionId, name);
        }

        //Specifications

        [HttpGet("getallspecifications")]
        public async Task<List<Specification>> GetAllSpecifications()
        {
            return await _productCardService.GetAllSpecifications();
        }

        [HttpPost("createspecification")]
        public async Task<Specification> CreateSpecification(string name)
        {
            return await _productCardService.CreateSpecification(name);
        }

        [HttpPut("updatespecification")]
        public async Task<Specification> UpdateSpecification(UpdateSpecificationDTO dto)
        {
            return await _productCardService.UpdateSpecification(dto);
        }

        //Filters

        [HttpGet("getallfilters")]
        public async Task<List<ProductFilter>> GetAllFilters()
        {
            return await _productCardService.GetAllFilters();
        }

        [HttpPost("createfilter")]
        public async Task<ProductFilter> CreateFilter(CreateFilterDTO dto)
        {
            return await _productCardService.CreateFilter(dto);
        }

        [HttpPut("updatefilter")]
        public async Task<ProductFilter> UpdateFilter(UpdateFilterDTO dto)
        {
            return await _productCardService.UpdateFilter(dto);
        }

        [HttpPost("getfiltersofproducts")]
        public async Task<List<ProductFilterDTO>> GetFiltersByProducts(List<int> ids)
        {
            return await _productCardService.GetFiltersByProducts(ids);
        }
    }
}

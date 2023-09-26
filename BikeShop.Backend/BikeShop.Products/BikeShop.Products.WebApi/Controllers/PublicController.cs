using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Public;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Public;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("public")]
    public class PublicController : ControllerBase
    {
        private readonly IPublicService _publicService;

        public PublicController(IPublicService publicService)
        {
            _publicService = publicService;
        }

        [HttpPost("getcategories")]
        public async Task<List<ProductCategory>> GetCategories()
        {
            return await _publicService.GetCategories();
        }

        [HttpPost("search")]
        public async Task<PublicProductSearchResponse> Serch(PublicProductSearchRequest dto)
        {
            return await _publicService.Serch(dto);
        }

        [HttpPost("catalogproducts")]
        public async Task<PublicProductByCategoryResponse> GetProducts(PublicProductByCategoryRequest dto)
        {
            return await _publicService.GetProducts(dto);
        }

        [HttpPost("getproductcardbyid")]
        public async Task<ProductCardDTO> getProductCard(int productId)
        {
            return await _publicService.getProductCard(productId);
        }
    }
}

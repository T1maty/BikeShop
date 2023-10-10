using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Public;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.ProductCart;
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

        [HttpGet("getcategories")]
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

        [HttpGet("getproductcardbyid")]
        public async Task<ProductCardDTO> getProductCard(int productId)
        {
            return await _publicService.getProductCard(productId);
        }

        [HttpGet("getfav")]
        public async Task<List<ProductCardDTO>> GetFavProducts(Guid ClientId)
        {
            return await _publicService.GetFavProducts(ClientId);
        }
        [HttpPost("addfav")]
        public async Task<ProductCardDTO> AddFavProducts(Guid ClientId, int ProductId)
        {
            return await _publicService.AddFavProducts(ClientId, ProductId);
        }
        [HttpDelete("delfav")]
        public async Task DelFavProducts(Guid ClientId, int ProductId)
        {
            await _publicService.DelFavProducts(ClientId,ProductId);
        }

        [HttpGet("getcart")]
        public async Task<List<ProductCartResponse>> GetCart(Guid ClientId)
        {
            return await _publicService.GetCart(ClientId);
        }
        [HttpPost("addcart")]
        public async Task<ProductCartResponse?> AddToCart(Guid ClientId, int ProductId, decimal Quantity)
        {
            return await _publicService.AddToCart(ClientId, ProductId,Quantity);
        }
    }
}

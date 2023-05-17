using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Responses;
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

        [HttpGet("gettags")]
        public async Task<List<ProductTag>> GetTags()
        {
            return await _publicService.GetTags();
        }

        [HttpGet("defaultproducts")]
        public async Task<List<ProductCardDTO>> DefaultProducts(int Quantity)
        {
            return await _publicService.DefaultProducts(Quantity);
        }

        [HttpPost("search")]
        public async Task<List<Product>> Serch(string querry)
        {
            return await _publicService.Serch(querry);
        }

        [HttpPost("getproducts")]
        public async Task<List<ProductCardDTO>> GetProducts(List<int> ids)
        {
            return await _publicService.GetProducts(ids);
        }
    }
}

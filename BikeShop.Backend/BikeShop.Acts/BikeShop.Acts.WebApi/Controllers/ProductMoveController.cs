using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.ProductMove;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("productmove")]
    public class ProductMoveController : ControllerBase
    {
        private readonly IProductMoveService _productMoveService;

        public ProductMoveController(IProductMoveService productMoveService)
        {
            _productMoveService = productMoveService;
        }

        [HttpGet("getbyshop")]
        public async Task<List<ProductMoveWithProducts>> GetByShop(int ShopId, int Take)
        {
            return await _productMoveService.GetByShop(ShopId, Take);
        }

        [HttpPost("create")]
        public async Task<ProductMoveWithProducts> Create(ProductMoveCreateDTO dto)
        {
            return await _productMoveService.Create(dto);
        }

        [HttpPut("update")]
        public async Task<ProductMoveWithProducts> Update(ProductMoveUpdateDTO dto)
        {
            return await _productMoveService.Update(dto);
        }

        [HttpPut("transfer")]
        public async Task<ProductMoveWithProducts> SetStatusToTransfer(int ActId, Guid User)
        {
            return await _productMoveService.SetStatusToTransfer(ActId, User);
        }

        [HttpPut("execute")]
        public async Task<ProductMoveWithProducts> Execute(int ActId, Guid User)
        {
            return await _productMoveService.Execute(ActId, User);
        }
    }
}

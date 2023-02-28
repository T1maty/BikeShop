using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("storage")]
    public class StorageController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public StorageController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpPost("getbyids")]
        public async Task<List<StorageProductsDTO>> GetByIds([FromBody] List<int> Ids)
        {
            return await _storageService.GetByIds(Ids);
        }

        [HttpGet("getbystorage")]
        public async Task<StorageProductsDTO> GetByStorage(int storageId)
        {
            return await _storageService.GetByStorage(storageId);
        }

        [HttpPost("addproductstostorage")]
        public async Task<StorageProductsDTO> AddProductsToStorage([FromBody] List<ProductQuantitySmplDTO> products, int storageId)
        {
            return await _storageService.GetByStorage(storageId);
        }

    }
}

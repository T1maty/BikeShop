using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;

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
        //[Authorize(Roles = "")]
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
        ///
        [HttpGet("getidsbystorage")]
        public async Task<List<ProductStorageQuantity>> GetIdByStorage(int storageId)
        {
            return await _storageService.GetIdByStorage(storageId);
        }
        ///
        [HttpPost("addproductstostorage")]
        public async Task AddProductsToStorage([FromBody] List<ProductQuantitySmplDTO> products, int storageId, string source, int sourceId)
        {
            await _storageService.AddProductsToStorage(products,storageId,source,sourceId);
        }

        [HttpPost("updatereservation")]
        public async Task UpdateReservationProducts([FromBody] UpdateReservationProductsDTO dto, int storageId)
        {
            await _storageService.UpdateReservationProducts(dto.OldReservationProducts, dto.NewReservationProducts, storageId);
        }

        [HttpPost("getFromBRUA")]
        public async Task<string> GetFromBRUA()
        {
            return await _storageService.GetFromBRUA();
        }

        [HttpGet("AITemplate")]
        public async Task<string> AITemplate()
        {
            return await _storageService.AITemplate();
        }
    }
}

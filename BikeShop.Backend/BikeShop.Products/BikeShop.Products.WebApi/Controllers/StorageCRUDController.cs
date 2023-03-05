using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers { 

    [Produces("application/json")]
    [ApiController]
    [Route("storagecrud")]
    public class StorageCRUDController:ControllerBase
    {
        private readonly IStorageCRUDService _storageCRUDService;

        public StorageCRUDController(IStorageCRUDService storageCRUDService)
        {
            _storageCRUDService = storageCRUDService;
        }

        [HttpGet("getall")]
        public async Task<List<Storage>> Get()
        {
            return await _storageCRUDService.Read();
        }

        [HttpPost("create")]
        public async Task<Storage> Create([FromBody] CreateStorageDTO dto)
        {
            return await _storageCRUDService.Create(dto);
        }

        [HttpPost("update")]
        public async Task<Storage> Update([FromBody] UpdateStorageDTO dto)
        {
            return await _storageCRUDService.Update(dto);
        }
    }
}

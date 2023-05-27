using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

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

        [Authorize(Roles = "storagecrud_getall")]
        [HttpGet("getall")]
        public async Task<List<Storage>> Get()
        {
            return await _storageCRUDService.Read();
        }
        //[Authorize(Roles = "storagecrud_create")]
        [HttpPost("create")]
        public async Task<Storage> Create([FromBody] CreateStorageDTO dto)
        {
            return await _storageCRUDService.Create(dto);
        }
        [Authorize(Roles = "storagecrud_update")]
        [HttpPost("update")]
        public async Task<Storage> Update([FromBody] UpdateStorageDTO dto)
        {
            return await _storageCRUDService.Update(dto);
        }
    }
}

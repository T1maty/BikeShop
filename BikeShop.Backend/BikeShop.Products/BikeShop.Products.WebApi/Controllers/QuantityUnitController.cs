using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Application.Services;
using BikeShop.Products.Domain.DTO.Requestes.QuantityUnit;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("quantityunit")]
    public class QuantityUnitController : ControllerBase
    {
        private readonly IQuantityUnitService _quantityUnitService;

        public QuantityUnitController(IQuantityUnitService quantityUnitService)
        {
            _quantityUnitService = quantityUnitService;
        }

        [HttpGet("getall")]
        public async Task<List<QuantityUnit>> GetAll()
        {
            return await _quantityUnitService.GetAll();
        }

        [HttpPost("create")]
        public async Task<QuantityUnit> Create(CreateQuantityUnitDTO dto)
        {
            return await _quantityUnitService.Create(dto);
        }

        [HttpPut("update")]
        public async Task<QuantityUnit> Update(UpdateQuantityUnitDTO dto)
        {
            return await _quantityUnitService.Update(dto);
        }

        [HttpGet("getallgroups")]
        public async Task<List<QuantityUnitGroup>> GetAllGroups()
        {
            return await _quantityUnitService.GetAllGroups();
        }

        [HttpPost("creatgroup")]
        public async Task<QuantityUnitGroup> CreateGroup(CreateUnitGroupDTO dto)
        {
            return await _quantityUnitService.CreateGroup(dto);
        }

        [HttpPut("updategroup")]
        public async Task<QuantityUnitGroup> UpdateGroup(UpdateUnitGroupDTO dto)
        {
            return await _quantityUnitService.UpdateGroup(dto);
        }
    }
}

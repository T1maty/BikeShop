using AutoMapper;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag;
using BikeShop.Products.Application.CQRS.Commands.Tag.UpdateTag;
using BikeShop.Products.Application.CQRS.Queries.Tag.GetAllTags;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Category;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.WebApi.Models.ProductTag;
using BikeShop.Products.WebApi.Models.Validation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers;

[Produces("application/json")]
[ApiController]
[Route("category")]
public class ProductCategoryController : ControllerBase
{
    private readonly IProductCategoryFilterService _filterService;

    public ProductCategoryController(IProductCategoryFilterService filterService)
    {
        _filterService = filterService;
    }

    [HttpPost("create")]
    public async Task<ProductCategory> CreateCategory(CreateCategoryDTO model)
    {
        return await _filterService.CreateCategory(model);
    }

    [HttpPut("update")]
    public async Task<ProductCategory> UpdateCategory(UpdateCategoryDTO model)
    {
        return await _filterService.UpdateCategory(model);
    }

    [HttpDelete("delete")]
    public async Task DeleteCategory(int Id)
    {
        await _filterService.DeleteCategory(Id);
    }

    [HttpGet("getall")]
    public async Task<List<ProductCategory>> GetAllCategories()
    {
        return await _filterService.GetAllCategories();
    }

    [HttpGet("transfer")]
    public async Task transfer()
    {
        await _filterService.transfer();
    }
}
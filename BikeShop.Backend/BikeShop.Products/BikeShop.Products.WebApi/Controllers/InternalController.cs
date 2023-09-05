using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Internal;
using BikeShop.Products.Domain.DTO.Requestes.Product;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("internal")]
    public class InternalController : ControllerBase
    {
        private readonly IInternalService _internalService;

        public InternalController(IInternalService internalService)
        {
            _internalService = internalService;
        }

        [HttpPost("updatecategorieslist")]
        public async Task UpdateCategoriesList()
        {
            await _internalService.UpdateCategoriesList();
        }

        [HttpGet("getCatDepList")]
        public async Task<List<TagToCategoryBind>> GetCatDepList()
        {
            return await _internalService.GetCatDepList();
        }

        [HttpGet("updateCatDep")]
        public async Task<TagToCategoryBind> UpdateCatDep(int depId, int TagId, string TagName, string CatName)
        {
            return await _internalService.UpdateCatDep(depId, TagId, TagName, CatName);
        }

        [HttpGet("productsByCategory")]
        public async Task ProductsByCat(string Cat)
        {
            //return await _internalService.ProductsByCat(Cat);
        }

        [HttpPost("setProductTags")]
        public async Task<ProductWithCataAndFilters> SetProductTags(int prodId, int catId, List<int> VariantIds)

        {
           return  await _internalService.SetProductTags(prodId, catId, VariantIds);
        }

        [HttpGet("productsAvailable")]
        public async Task<List<ProductWithCataAndFilters>> productsAvailable()
        {
           return await _internalService.productsAvailable();
        }
    }
}

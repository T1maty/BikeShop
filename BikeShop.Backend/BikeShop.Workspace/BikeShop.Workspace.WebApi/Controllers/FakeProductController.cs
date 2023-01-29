using AutoMapper;
using BikeShop.Workspace.Domain.Entities;
using BikeShop.Workspace.WebApi.Models.Product;
using Microsoft.AspNetCore.Mvc;
using static BikeShop.Workspace.Domain.Entities.Product;

namespace BikeShop.Workspace.WebApi.Controllers
{
    [ApiController]
    [Route("product")]
    public class FakeProductController : ControllerBase
    {
        private readonly IMapper _mapper;

        public FakeProductController(IMapper mapper)
        {
            _mapper = mapper;
        }

        private static List<Product> _products = new List<Product>()
        {
            new Product{
                Id = 1,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Name = "product1",
                CatalogKey = "catalogkey1",
                Category = "category1",
                Barcode = "barcode1",
                IncomePrice = 228,
                DealerPrice = 300,
                RetailPrice = 240,
                BrandId = 1,
                CheckStatus = "check status 1",
                CheckVisibility = true
            },
             new Product{
                Id = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Name = "product2",
                CatalogKey = "catalogkey2",
                Category = "category1",
                Barcode = "barcode2",
                IncomePrice = 500,
                DealerPrice = 800,
                RetailPrice = 1000,
                BrandId = 2,
                CheckStatus = "check status 2",
                CheckVisibility = true
            },
             new Product{
                Id = 3,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Name = "product3",
                CatalogKey = "catalogkey3",
                Category = "category2",
                Barcode = "barcode3",
                IncomePrice = 2128,
                DealerPrice = 3010,
                RetailPrice = 2140,
                BrandId = 1,
                CheckStatus = "check status 3",
                CheckVisibility = true
            }
        };


        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var product = _mapper.Map<Product>(model);
            product.Id = _products.Count + 1;
            _products.Add(product);

            return Ok();
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(_products);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var product = _products.FirstOrDefault(p => p.Id == model.Id);

            if (product is null)
                return BadRequest($"No product with id {model.Id}");

            product.Name = model.Name;
            product.CatalogKey = model.CatalogKey;
            product.Barcode = model.Barcode;
            product.IncomePrice = model.IncomePrice;
            product.RetailPrice = model.RetailPrice;
            product.DealerPrice = model.DealerPrice;
            product.BrandId = model.BrandId;
            product.UpdatedAt = DateTime.Now;
            product.CheckStatus = model.CheckStatus;
            product.CheckVisibility = model.CheckVisibility;

            return Ok();
        }

    }
}
using AutoMapper;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.CQRS.Queries.Product.GetProductByBarcode;
using BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTagsQuery;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Requestes.Product;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.WebApi.Models.Product;
using BikeShop.Products.WebApi.Models.Validation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("product")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IProductService _productService;

        public ProductController(IMediator mediator, IProductService productService)
        {
            _mediator = mediator;
            _productService = productService;
        }

        [HttpPost("create")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(ValidationResultModel), StatusCodes.Status422UnprocessableEntity)]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] CreateProductDTO dto)
        {
            return await _productService.Create(dto);
        }


        /// <summary>
        /// Получение товара по коду штрихкода (внешнему или внутреннему)
        /// </summary>
        /// 
        /// <param name="barcode">Код штрихкода</param>
        /// <returns>Возвращает продукт с указанным штрихкодом</returns>
        ///
        /// <response code="200">Успех. Возвращает товар по указанному штрихкоду</response>
        /// <response code="404">Продукт с указанным штрихкодом не найден (product_not_found)</response>
        [HttpGet("getbybarcode/{barcode}")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IException),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Product>> GetProductByBarcode(string barcode)
        {
            var query = new GetProductByBarcodeQuery { Barcode = barcode };
            var product = await _mediator.Send(query);

            return Ok(product);
        }


        [HttpPut("update")]
        [ProducesResponseType(typeof(void),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IException),StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ValidationResultModel),StatusCodes.Status422UnprocessableEntity)]
        public async Task<Product> UpdateProduct([FromBody] UpdateProductDTO dto)
        {
            return await _productService.Update(dto);
        }


        [HttpGet("getbycategory")]
        public async Task<List<Product>> GetProductsByCategory(int Id, int Take)
        {
            return await _productService.GetProductsByCategory(Id, Take);
        }

        [HttpPost("getbyids")]
        public async Task<List<Product>> GetProductsByIdsArray([FromBody] List<int> Ids)
        {
            return await _productService.GetProductsByIdsArray(Ids);
        }

        [HttpGet("unsorted")]
        public async Task<List<ProductQuantityDTO>> GetUnsorted(int srorageId)
        {
            return await _productService.GetUnsorted(srorageId);
        }

        [HttpPost("addimagetoproduct")]
        public async Task<ProductImg> AddImageToProduct(int productId, [FromForm]IFormFile imageFile)
        {
            return await _productService.AddImageToProduct(productId, imageFile);
        }

        [HttpPost("deleteimage")]
        public async Task DeleteImage(int imageId)
        {
            await _productService.DeleteImage(imageId);
        }

        [HttpPut("updateimage")]
        public async Task<ProductImg> UpdateImage(ProductImageDTO dto)
        {
            return await _productService.UpdateImage(dto);
        }

        [HttpPut("updateprices")]
        public async Task<Product> UpdatePrices(UpdateProductPriceDTO dto)
        {
            return await _productService.UpdatePrices(dto);
        }

        //[Authorize(Roles = "")]
        [HttpGet("search")]
        public async Task<List<Product>> Search(string querry)
        {
            return await _productService.Search(querry);
        }

        [HttpPut("addArray")]
        public async Task AddArray(List<AddArrayProductDTO> dto)
        {
            await _productService.AddArray(dto);
        }
    }
}
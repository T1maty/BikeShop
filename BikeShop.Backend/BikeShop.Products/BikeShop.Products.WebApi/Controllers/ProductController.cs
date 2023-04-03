using AutoMapper;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.CQRS.Commands.Product.CreateProduct;
using BikeShop.Products.Application.CQRS.Commands.Product.UpdateProduct;
using BikeShop.Products.Application.CQRS.Queries.Product.GetProductByBarcode;
using BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTagsQuery;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.WebApi.Models.Product;
using BikeShop.Products.WebApi.Models.Validation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("product")]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IProductService _productService;

        public ProductController(IMapper mapper, IMediator mediator, IProductService productService)
        {
            _mapper = mapper;
            _mediator = mediator;
            _productService = productService;
        }


        /// <summary>
        /// Создание нового товара
        /// </summary>
        ///
        /// <remarks>
        /// Обязательные поля: name, catalogKey, category, все price, brandId, TagsIds
        /// </remarks>
        /// 
        /// <param name="model">Модель создания продукта</param>
        /// <returns>Ничего</returns>
        ///
        /// <response code="200">Успех. Продукт создан</response>
        /// <response code="404">Бренд с указанным id не найден (brand_not_found)</response>
        /// <response code="409">Товар с указанным manufacturerBarcode уже существует (product_already_exists)</response>
        /// <response code="500">Скорее всего, одного из тэгов из tagsIds не существует</response>
        /// <response code="422">Невалидная модель</response>
        [HttpPost("create")]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(ValidationResultModel), StatusCodes.Status422UnprocessableEntity)]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] CreateProductModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var command = _mapper.Map<CreateProductCommand>(model);
            var product = await _mediator.Send(command);

            return Ok(product);
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


        /// <summary>
        /// Обновление продукта
        /// </summary>
        ///
        /// <remarks>
        /// Все поля обязательны. Переписывает все значения продукта с указанным id
        /// </remarks>
        /// 
        /// <param name="model">Продукт с нужным id и обновленными параметрами</param>
        /// <returns>Ничего</returns>
        ///
        /// <response code="200">Успех. Продукт обновлен</response>
        /// <response code="404">Не найден продукт с таким id (product_not_found) / Не найден бренд с таким id (brand_not_found)</response>
        /// <response code="422">Невалидная модель</response>
        [HttpPut("update")]
        [ProducesResponseType(typeof(void),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IException),StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ValidationResultModel),StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var command = _mapper.Map<UpdateProductCommand>(model);
            await _mediator.Send(command);

            return Ok();
        }

        /// <summary>
        /// Получение товаров по id тэгов
        /// </summary>
        ///
        /// <remarks>
        /// Пример запроса:
        /// GET /product/getbytags/1-4-16
        /// </remarks>
        /// 
        /// <param name="tagsIds">ID тэгов, разделенные тире (1-4-8-9)</param>
        /// <returns>Возвращает продукты по указанным тэгам</returns>
        ///
        /// <response code="200">Успех. Возвращает массив товаров по указанным тэгам</response>
        /// <response code="400">Некорректно указанные тэги. Правильный формат: 1-3-8 (tags_invalid)</response>
        [HttpGet("getbytags/{tagsIds}")]
        [ProducesResponseType(typeof(ProductsListModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(IException), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ProductQuantityDTO>>> GetProductsByTags(string tagsIds, int storageId)
        {
            return Ok(await _productService.GetProductsByTags(tagsIds, storageId));
        }

        [HttpPost("getbyids")]
        public async Task<List<Product>> GetProductsByIdsArray([FromBody] List<int> Ids)
        {
            return await _productService.GetProductsByIdsArray(Ids);
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
    }
}
using AutoMapper;
using BikeShop.Workspace.Application.CQRS.Commands.Product.CreateProduct;
using BikeShop.Workspace.Application.CQRS.Commands.Product.UpdateProduct;
using BikeShop.Workspace.Application.CQRS.Queries.Product.GetProductByBarcode;
using BikeShop.Workspace.Application.CQRS.Queries.Product.GetProductsByTags;
using BikeShop.Workspace.WebApi.Models.Product;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("product")]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public ProductController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
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
        /// <response code="400">Товар с указанным manufacturerBarcode уже существует</response>
        /// <response code="404">Бренд с указанным id не найден</response>
        /// <response code="500">Скорее всего, одного из тэгов из tagsIds не существует</response>
        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var command = _mapper.Map<CreateProductCommand>(model);
            await _mediator.Send(command);

            return Ok();
        }


        /// <summary>
        /// Получение товара по коду штрихкода (внешнему или внутреннему)
        /// </summary>
        ///
        /// <remarks>
        /// Пример запроса:
        /// GET /product/getbybarcode/6000000004
        /// </remarks>
        /// 
        /// <param name="barcode">Код штрихкод</param>
        /// <returns>Возвращает продукнт с указанным штрихкодом</returns>
        ///
        /// <response code="200">Успех. Возвращает товар по указанному штрихкоду</response>
        /// <response code="404">Продукт с указанным штрихкодом не найден</response>
        [HttpGet("getbybarcode/{barcode}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProductByBarcode(string barcode)
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
        /// <response code="404">Не найден продукт с таким id. Не найден бренд с таким id.</response>
        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
        /// <response code="400">Некорректно указанные тэги. Правильный формат: 1-3-8</response>
        [HttpGet("getbytags/{tagsIds}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetProductsByTags(string tagsIds)
        {
            var query = new GetProductsByTagsQuery { TagsArrayStr = tagsIds };
            var productsModel = await _mediator.Send(query);

            return Ok(productsModel);
        }
    }
}
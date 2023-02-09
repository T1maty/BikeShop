using AutoMapper;
using BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag;
using BikeShop.Products.Application.CQRS.Commands.Tag.UpdateTag;
using BikeShop.Products.Application.CQRS.Queries.Tag.GetAllTags;
using BikeShop.Products.WebApi.Models.ProductTag;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers;

[Produces("application/json")]
[ApiController]
[Route("tag")]
public class ProductTagController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;
    public ProductTagController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    /// <summary>
    /// Создание нового тэга
    /// </summary>
    ///
    /// <remarks>
    /// Обязательные поля: name
    /// </remarks>
    /// 
    /// <param name="model">Модель создания тэга</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех. Тэг создан</response>
    /// <response code="404">Тег с указанным parent id не найден</response>
    /// <response code="400">Тег с указанным именем уже существует</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> CreateTag([FromBody] CreateProductTagModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var command = _mapper.Map<CreateTagCommand>(model);
        await _mediator.Send(command);

        return Ok();
    }

    /// <summary>
    /// Обновление тега
    /// </summary>
    ///
    /// <remarks>
    /// Все поля обязательны. Переписывает все значения тега с указанным id
    /// </remarks>
    /// 
    /// <param name="model">Тег с нужным id и обновленными параметрами</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех. Тег обновлен</response>
    /// <response code="404">Не найден тег с таким id/parent id</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> UpdateTag([FromBody] UpdateProductTagModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var command = _mapper.Map<UpdateTagCommand>(model);
        await _mediator.Send(command);
        return Ok();
    }

    /// <summary>
    /// Получение всех тегов
    /// </summary>
    /// 
    /// <returns>Возвращает массив тегов</returns>
    ///
    /// <response code="200">Успех. Возвращает все теги</response>
    [HttpGet("getall")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<TagsListModel>> GetAllTags()
    {
        var model = await _mediator.Send(new GetAllTagsQuery());
        return model;
    }
        
}
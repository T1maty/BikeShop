using AutoMapper;
using BikeShop.Shop.Application.CQRS.Commands.CreateShop;
using BikeShop.Shop.Application.CQRS.Commands.UpdateShop;
using BikeShop.Shop.WebApi.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Shop.WebApi.Controllers;

[ApiController]
[Route("shop")]
[Produces("application/json")]
public class ShopController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ShopController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    /// <summary>
    /// Создание нового магазина
    /// </summary>
    ///
    /// <remarks>
    /// Обязательные поля: все
    /// </remarks>
    /// 
    /// <param name="model">Модель создания магазина</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех. Продукт создан</response>
    /// <response code="400">Магазин с указанным storage id уже существует</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> CreateShop([FromBody] CreateShopModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(model);

        var command = _mapper.Map<CreateShopCommand>(model);
        await _mediator.Send(command);

        return Ok();
    }
    
    /// <summary>
    /// Обновление магазина
    /// </summary>
    ///
    /// <remarks>
    /// Обязательные поля: все
    /// </remarks>
    /// 
    /// <param name="model">Модель обновления магазина</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех. Магазин обновлен</response>
    /// <response code="400">Магазин с указанным storage id уже существует</response>
    /// <response code="404">Магазин с указанным id не найден</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> UpdateShop([FromBody] UpdateShopModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(model);

        var command = _mapper.Map<UpdateShopCommand>(model);
        await _mediator.Send(command);

        return Ok();
    }
}
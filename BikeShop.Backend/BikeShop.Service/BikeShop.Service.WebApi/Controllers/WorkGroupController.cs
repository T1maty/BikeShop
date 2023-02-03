using AutoMapper;
using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.CQRS.Commands.WorkGroup.CreateWorkGroup;
using BikeShop.Service.Application.CQRS.Commands.WorkGroup.UpdateWorkGroup;
using BikeShop.Service.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;
using BikeShop.Service.WebApi.Models.WorkGroup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Service.WebApi.Controllers;

[ApiController]
[Route("group")]
public class GroupController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public GroupController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    /// <summary>
    /// Получение всех групп услуг по айди магазина
    /// </summary>
    ///
    /// <param name="id">ID магазина</param>
    /// <returns>Возвращает модель, хранящую массив со всеми группами услуг в магазине</returns>
    ///
    /// <response code="200">Успех. Возвращает массив групп услуг.</response>
    [HttpGet("getbyshopid/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<WorkGroupListModel>> GetWorkGroupsByShopId(int id)
    {
        // Создаю запрос
        var query = new GetWorkGroupByShopIdQuery { ShopId = id };

        // Посылаю запрос и получаю модель с листом групп услуг
        var result = await _mediator.Send(query);

        return Ok(result);
    }

    /// <summary>
    /// Создание группы услуг в магазине
    /// </summary>
    ///
    /// <param name="model">Модель создания группы услуг</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="400">Группа услуг с таким названием уже есть в магазине</response>
    /// <response code="404">Не найдена родительская группа с указанным parentId</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(IException),StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(IException),StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> CreateWorkGroup([FromBody] CreateWorkGroupModel model)
    {
        // Если не валидная модель
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        // Маплю модель в cqrs команду
        var command = _mapper.Map<CreateWorkGroupCommand>(model);

        // Кидаю команду на добавление на исполнение
        await _mediator.Send(command);

        return Ok();
    }

    /// <summary>
    /// Обновление группы услуг в магазине
    /// </summary>
    /// 
    /// <param name="model">Модель обновления группы услуг</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="400">Группа услуг с таким названием уже есть в магазине</response>
    /// <response code="404">Не найдена группа с указанным id / Не найдена родительская группа с указанным parentId</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(IException), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(IException),StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> UpdateWorkGroup([FromBody] UpdateWorkGroupModel model)
    {
        // Проверяю модель на валидность
        if (!ModelState.IsValid)
            return UnprocessableEntity(model);

        // Модель в cqrs команду
        var command = _mapper.Map<UpdateWorkGroupCommand>(model);

        // Отправляю на исполнение
        await _mediator.Send(command);

        return Ok();
    }
}
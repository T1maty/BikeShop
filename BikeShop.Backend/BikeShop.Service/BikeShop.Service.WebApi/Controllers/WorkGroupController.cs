using AutoMapper;
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
    /// Получение всех групп услуг у указанного магазина
    /// </summary>
    ///
    /// <remarks>
    /// Пример запроса:
    /// GET /group/getbyshopid/1
    /// </remarks>
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
    /// <remarks>
    /// Пример запроса:
    /// <code>
    /// POST /group/create
    /// {
    ///     name : "Замена частей",
    ///     parentId : 0,
    ///     shopId: 3
    ///     isCollapsed: false
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">CreateWorkGroupModel (модель создания группы услуг)</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
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
    /// Создание группы услуг в магазине
    /// </summary>
    ///
    /// <remarks>
    /// Пример запроса:
    /// <code>
    /// PUT /group/update
    /// {
    ///     id: 3
    ///     name : "Замена частей",
    ///     parentId : 0,
    ///     shopId: 3
    ///     isCollapsed: false
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">UpdateWorkGroupModel (модель обновления группы услуг)</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
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
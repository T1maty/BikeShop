using AutoMapper;
using BikeShop.Workspace.Application.CQRS.Commands.Work.CreateWork;
using BikeShop.Workspace.Application.CQRS.Commands.Work.UpdateWork;
using BikeShop.Workspace.Application.CQRS.Queries.Work.GetWorksByGroupId;
using BikeShop.Workspace.WebApi.Models.Work;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers;

[Produces("application/json")]
[ApiController]
[Route("work")]
public class WorkController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public WorkController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка всех услуг по id группы услуг
    /// </summary>
    ///
    /// <remarks>
    /// Пример запроса:
    /// GET /work/getbygroupid/1
    /// </remarks>
    /// 
    /// <param name="id">ID группы услуг (WorkGroup)</param>
    /// <returns>Возвращает модель, хранящую массив со всеми услугами касающихся указанной группы услуг</returns>
    ///
    /// <response code="200">Успех. Возвращает массив услуг</response>
    [HttpGet("getbygroupid/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<WorkListModel>> GetWorksByGroupId(int id)
    {
        var query = new GetWorksByGroupIdQuery { GroupId = id };

        return await _mediator.Send(query);
    }


    /// <summary>
    /// Создание услуги в группе услуг
    /// </summary>
    ///
    /// <remarks>
    /// Пример запроса:
    /// <code>
    /// POST /work/create
    /// {
    ///     name : "Замена подшипников",
    ///     description : "Покупка и замена подшипников руля" (не обязательное поле),
    ///     price : 265,
    ///     currencyId : 1,
    ///     groupId : 3
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">CreateWorkModel (модель создания услуги)</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateWork([FromBody] CreateWorkModel model)
    {
        // Если модель невалидная - возвращаю ошибку о невалидности
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        // Маплю модель на cqrs команду
        var createWorkCommand = _mapper.Map<CreateWorkCommand>(model);

        // Отправляю команду на исполнение
        await _mediator.Send(createWorkCommand);

        // Если дожило до этого момента - все ок
        return Ok();
    }

    /// <summary>
    /// Обновление услуги в группе услуг
    /// </summary>
    ///
    /// <remarks>
    /// Пример запроса:
    /// <code>
    /// PUT /work/create
    /// {
    ///     id: 2,
    ///     name : "Замена подшипников",
    ///     description : "Покупка и замена подшипников руля" (не обязательное поле),
    ///     price : 265,
    ///     currencyId : 1,
    ///     groupId : 3
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">UpdateWorkModel (модель обновления услуги)</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateWork([FromBody] UpdateWorkModel model)
    {
        // Если модель невалидная - возвращаю ошибку о невалидности
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        // Маплю модель на cqrs команду
        var updateWorkCommand = _mapper.Map<UpdateWorkCommand>(model);

        // Отправляю команду на исполнение
        await _mediator.Send(updateWorkCommand);

        // Если дожило до этого момента - все ок
        return Ok();
    }
}
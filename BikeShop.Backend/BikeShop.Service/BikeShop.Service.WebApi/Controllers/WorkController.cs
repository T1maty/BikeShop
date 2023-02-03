using AutoMapper;
using BikeShop.Service.Application.CQRS.Commands.Work.CreateWork;
using BikeShop.Service.Application.CQRS.Commands.Work.UpdateWork;
using BikeShop.Service.Application.CQRS.Queries.Work.GetWorksByGroupId;
using BikeShop.Service.WebApi.Models.Work;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Service.WebApi.Controllers;

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
    /// <param name="model">Модель создания услуги</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="404">Не найдена группа услуг с таким id</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
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
    /// <param name="model">Модель обновления услуги</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="404">Услуга с указанным id не найдена</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
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
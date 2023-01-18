using AutoMapper;
using BikeShop.Workspace.Application.CQRS.Commands.Work.CreateWork;
using BikeShop.Workspace.Application.CQRS.Queries.Work.GetWorksByGroupId;
using BikeShop.Workspace.WebApi.Models.Work;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers;

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

    // Получение всех услуг по айди группы
    [HttpGet("getbygroupid/{id:int}")]
    public async Task<ActionResult<WorkListModel>> GetWorksByGroupId(int id)
    {
        var query = new GetWorksByGroupIdQuery { GroupId = id };

        return await _mediator.Send(query);
    }

    [HttpPost("create")]
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
}
using AutoMapper;
using BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.CreateWorkGroup;
using BikeShop.Workspace.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;
using BikeShop.Workspace.WebApi.Models.WorkGroup;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers;

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

    // Получение групп услуг по айди магазина
    [HttpGet("getbyshopid/{id:int}")]
    public async Task<ActionResult<WorkGroupListModel>> GetWorkGroupsByShopId(int id)
    {
        // Создаю запрос
        var query = new GetWorkGroupByShopIdQuery { ShopId = id };

        // Посылаю запрос и получаю модель с листом групп услуг
        var result = await _mediator.Send(query);

        return Ok(result);
    }
    
    // Создание группы услуг
    [HttpPost("create")]
    public async Task<IActionResult> CreateWorkGroup(CreateWorkGroupModel model)
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
}
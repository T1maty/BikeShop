using AutoMapper;
using BikeShop.Workspace.Application.CQRS.Queries.WorkGroup.GetWorkGroupByShopId;
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
}
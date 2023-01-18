using BikeShop.Workspace.Application.CQRS.Commands.Work.GetWorksByGroupId;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers;

[ApiController]
[Route("work")]
public class WorkController : ControllerBase
{
    private readonly IMediator _mediator;

    public WorkController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // Получение всех услуг по айди группы
    [HttpGet("getbygroupid/{id:int}")]
    public async Task<ActionResult<WorkListModel>> GetWorksByGroupId(int id)
    {
        var query = new GetWorksByGroupIdQuery { GroupId = id };

        return await _mediator.Send(query);
    }
    
    
}
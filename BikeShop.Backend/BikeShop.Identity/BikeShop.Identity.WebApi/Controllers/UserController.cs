using System.Security.Claims;
using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.UpdateUserPublic;
using BikeShop.Identity.WebApi.Models.User;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers;

[ApiController]
[Route("user")]
[Produces("application/json")]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public UserController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut("updatepublic")]
    public async Task<IActionResult> UpdateUserPublic([FromBody] UpdateUserPublicModel model)
    {
        // Console.WriteLine("start");
        // var claims = (User.Identity as ClaimsIdentity)?.Claims;

        // foreach(var claim in claims)
        //     System.Console.WriteLine(claim.Type + " " + claim.Value);

        // Получаю id пользователя из jwt токена
        var req = (User.Identity as ClaimsIdentity)?.Claims
            .FirstOrDefault(c => c.Type == "id");
        var id = req?.Value;


        // Если в токене нету айди пользователя - ошибка
        if (id is null)
            return BadRequest(new
            {
                error = "invalid_access_token",
                errorDescription = "Update user public data error. Access token does not contains user id"
            });

        // Леплю команду и посылаю её на исполнение
        var command = new UpdateUserPublicCommand
        {
            UserId = id,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Patronymic = model.Patronymic,
            Email = model.Email
        };

        await _mediator.Send(command);

        return Ok();
    }
}
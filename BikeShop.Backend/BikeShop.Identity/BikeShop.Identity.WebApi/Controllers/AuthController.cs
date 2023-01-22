using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.CreateRefreshSession;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;
using BikeShop.Identity.WebApi.Models.Auth;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace BikeShop.Identity.WebApi.Controllers;

[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public AuthController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    [HttpPost("[action]")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<ActionResult<AccessTokensModel>> SignIn([FromQuery] SignInModel model)
    {
        // Ищу пользователя в базе и возвращаю. Вылетит исключение если нет пользователя
        var getUserQuery = _mapper.Map<GetUserByUsernameQuery>(model);
        var user = await _mediator.Send(getUserQuery);

        // Получаю токены
        var getTokensQuery = _mapper.Map<GetAccessTokensQuery>(model);
        var tokens = await _mediator.Send(getTokensQuery);

        // Если ошибка при получении токена - возвращаю badrequest
        if (!string.IsNullOrEmpty(tokens.Error))
            return new BadRequestObjectResult(tokens);

        // Стартую сессию
        var createSessionCommand = new CreateRefreshSessionCommand
        {
            Fingerprint = model.Fingerprint,
            ExpiresIn = tokens.ExpiresIn,
            RefreshToken = tokens.RefreshToken,
            UserId = Guid.Parse(user.Id)
        };
        await _mediator.Send(createSessionCommand);

        return Ok(tokens);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> SignUp([FromBody] SignUpModel model)
    {
        var createUserCommand = _mapper.Map<CreateUserCommand>(model);
        await _mediator.Send(createUserCommand);

        return Ok();
    }

    // [HttpPost]
    // public async Task<ActionResult<AccessTokensModel>> Refresh([FromBody] RefreshModel model)
    // {
    //        
    // }
}
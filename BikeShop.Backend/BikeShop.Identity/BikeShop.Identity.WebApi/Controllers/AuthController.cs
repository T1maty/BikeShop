using System.Net;
using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;
using BikeShop.Identity.Application.CQRS.Commands.DeleteRefreshSessionByToken;
using BikeShop.Identity.Application.CQRS.Commands.SetRefreshSession;
using BikeShop.Identity.Application.CQRS.Commands.UpdateRefreshSession;
using BikeShop.Identity.Application.CQRS.Queries.GetUserById;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Services;
using BikeShop.Identity.WebApi.Models.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;
    private readonly CookieService _cookieService;

    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public AuthController(JwtService jwtService, IMapper mapper, IMediator mediator, CookieService cookieService)
    {
        _jwtService = jwtService;
        _cookieService = cookieService;
        _mapper = mapper;
        _mediator = mediator;
    }
    /// <summary>
    /// Пользователь логинится 
    /// </summary>
    /// <remarks>
    /// Пример Запроса:
    /// <code>
    /// POST /Auth/login
    /// {
    /// 
    /// email: kvadrofadro123@gmail.com,
    /// или по номеру телефона:
    /// Phone: +39012345678,
    /// password: kavo1234,
    /// UserId: 1
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">LoginUser( Вход в аккаунт Юзеру)</param>
    /// <returns>Ничего</returns>
    /// <response code="200">Успешный вход</response>

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        // Получаю пользователя по данным логина
        var getUserQuery = _mapper.Map<GetUserBySignInDataQuery>(model);
        var userData = await _mediator.Send(getUserQuery);

        // Создаю/обновляю рефреш сессию для пользователя и получаю рефреш токен
        var setSessionCommand = new SetRefreshSessionCommand { UserId = Guid.Parse(userData.User.Id) };
        var refreshToken = await _mediator.Send(setSessionCommand);

        // Добавляю рефреш токен в httpOnly cookie
        _cookieService.AddRefreshCookieToResponse(HttpContext.Response, refreshToken);

        // Генерирую access token для пользователя
        var accessToken = _jwtService.GenerateUserJwt(userData.User, userData.UserRoles);

        return Ok(new { accessToken });
    }

    /// <summary>
    /// Пользователь Регистрируеться  
    /// </summary>
    /// <remarks>
    /// Пример Запроса:
    /// <code>
    /// POST /Auth/register
    /// {
    /// phone: +3809812345678 ,
    /// password: 12345670bike ,
    /// email: malori@gmail.com  ,
    /// firstName: Иван ,
    /// lastName:  Шалушарий,
    /// patronymic: Сергеевич,
    /// shopId: 3
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">Register User( Регистрация Юзера)</param>
    /// <returns> Ничего </returns>
    /// <response code="200">Успешно Зарегистрирован</response>
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var command = _mapper.Map<CreateUserCommand>(model);
        var id = await _mediator.Send(command);

        Console.WriteLine("Registered new user. ID: " + id);

        return Ok();
    }

    /// <summary>
    /// Refresh Token Пользователя  
    /// </summary>
    /// <remarks>
    /// Пример Запроса:
    /// <code>
    /// POST /Auth/refresh
    /// {
    /// refresh token: random
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">Refresh Token</param>
    /// <returns> Ничего </returns>
    /// <response code="200">Successfully Refresh</response>
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        // Пытаюсь достать из куки рефреш токен. Если его нет - исключение
        if (!Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken))
            throw new RefreshTokenException("Cookie refresh token not found")
            {
                Error = "cookie_refresh_token_not_found",
                ErrorDescription = "Expected refresh token in httponly cookie does not exists"
            };

        // Обновляю рефреш сессию. Если пришедший рефреш токен невалидный - получим исключение
        // Если все ок - получу всю сессию, в том числе id пользователя
        var updateSessionCommand = new UpdateRefreshSessionCommand { RefreshToken = Guid.Parse(refreshToken) };
        var refreshSession = await _mediator.Send(updateSessionCommand);

        // Получаю пользователя этой сессии
        var getUserQuery = new GetUserByIdQuery { UserId = refreshSession.UserId };
        var userData = await _mediator.Send(getUserQuery);

        // Добавляю рефреш токен в httpOnly cookie
        _cookieService.AddRefreshCookieToResponse(HttpContext.Response, refreshSession.RefreshToken);

        // Генерирую новый access токен и возвращаю его 
        var accessToken = _jwtService.GenerateUserJwt(userData.User, userData.UserRoles);

        return Ok(new { accessToken });
    }

    /// <summary>
    /// Refresh Token Пользователя  
    /// </summary>
    /// <remarks>
    /// Пример Запроса:
    /// <code>
    /// POST /Auth/logout
    /// {
    ///  phone: +38095234567,
    ///  password: ziropoint@gmail.com
    /// }
    /// </code>
    /// </remarks>
    /// 
    /// <param name="model">Logout User</param>
    /// <returns> Ничего </returns>
    /// <response code="200">Successfully Logout</response>

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        // Пытаюсь достать из куки рефреш токен. Если его нет - исключение
        if (!Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken))
            throw new RefreshTokenException("Cookie refresh token not found")
            {
                Error = "cookie_refresh_token_not_found",
                ErrorDescription = "Expected refresh token in httponly cookie does not exists"
            };

        // Удаляю сессию по рефреш токену из базы
        var deleteCommand = new DeleteRefreshSessionByTokenCommand() { RefreshToken = Guid.Parse(refreshToken) };
        await _mediator.Send(deleteCommand);

        // Удаляю кукас
        Response.Cookies.Delete("X-Refresh-Token");

        return Ok();
    }
}
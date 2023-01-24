using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.CreateUser;
using BikeShop.Identity.Application.CQRS.Commands.SetRefreshSession;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;
using BikeShop.Identity.Application.Services;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.WebApi.Models.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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


    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var command = _mapper.Map<CreateUserCommand>(model);
        var id = await _mediator.Send(command);

        Console.WriteLine("Registered new user. ID: " + id);

        return Ok();
    }


    // [HttpGet("refresh")]
    // public async Task<IActionResult> Refresh()
    // {
    //     if (!(Request.Cookies.TryGetValue("X-Username", out var userName) &&
    //           Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken)))
    //         return BadRequest();
    //
    //     var user = await _userManager.Users
    //         .FirstOrDefaultAsync(i => i.UserName == userName
    //                                   && i.RefreshToken == Guid.Parse(refreshToken));
    //
    //     var roles = await _userManager.GetRolesAsync(user);
    //
    //     if (user is null)
    //         return BadRequest();
    //
    //     var token = _jwtService.GenerateUserJwt(user, roles);
    //
    //     user.RefreshToken = Guid.NewGuid();
    //
    //     await _userManager.UpdateAsync(user);
    //
    //     Response.Cookies.Append("X-Access-Token", token,
    //         new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
    //     Response.Cookies.Append("X-Username", user.UserName,
    //         new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
    //     Response.Cookies.Append("X-Refresh-Token", user.RefreshToken.ToString(),
    //         new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
    //
    //     return Ok();
    // }
}
using System.Text.Json;
using AutoMapper;
using BikeShop.Identity.Application.CQRS.Commands.CreateRefreshSession;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using BikeShop.Identity.Application.CQRS.Queries.GetUserBySigninData;
using BikeShop.Identity.WebApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.WebApi.Controllers;

[ApiController]
public class AuthController : ControllerBase
{
    private readonly SignInManager<BikeShopUser> _signInManager;
    private readonly UserManager<BikeShopUser> _userManager;

    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public AuthController(SignInManager<BikeShopUser> signInManager, UserManager<BikeShopUser> userManager,
        IMapper mapper, IMediator mediator)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _mapper = mapper;
        _mediator = mediator;
    }

    [HttpPost("[action]")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<ActionResult<AccessTokensModel>> SignIn([FromQuery] SignInModel model)
    {
        // Ищу пользователя в базе и возвращаю. Вылетит исключение если нет пользователя
        var getUserQuery = _mapper.Map<GetUserBySigninDataQuery>(model);
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
    public async Task<IActionResult> Register([FromBody] SignUpModel model)
    {
        Console.WriteLine("REGISTER");
        Console.WriteLine(JsonSerializer.Serialize(model));
        var user = new BikeShopUser
        {
            UserName = model.PhoneNumber.TrimStart('+'),
            FirstName = model.FirstName,
            LastName = model.LastName,
            Patronymic = model.Patronymic,
            Email = model.Email,
            ShopId = model.ShopId,
            PhoneNumber = model.PhoneNumber
        };
        Console.WriteLine("BIKESHOPUSER");
        Console.WriteLine(JsonSerializer.Serialize(user));

        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, false);
            return Ok();
        }

        return BadRequest();
    }
}
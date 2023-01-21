using System.Text.Json;
using AutoMapper;
using BikeShop.Identity.Application.CQRS.Queries.GetAccessTokens;
using BikeShop.Identity.WebApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BikeShop.Identity.Domain.Entities;
using MediatR;

namespace BikeShop.Identity.WebApi.Controllers;

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
    public async Task<ActionResult<AccessTokensModel>> Login([FromQuery] LoginModel model)
    {
        Console.WriteLine("MODEL");
        Console.WriteLine(JsonSerializer.Serialize(model));
        
        var getTokensQuery = _mapper.Map<GetAccessTokensQuery>(model);
        var response = await _mediator.Send(getTokensQuery);

        if (!string.IsNullOrEmpty(response.Error))
            return new BadRequestObjectResult(response);

        return Ok(response);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        Console.WriteLine("REGISTER");
        Console.WriteLine(JsonSerializer.Serialize(model));
        var user = new BikeShopUser
        {
            UserName = model.Email.Split('@').First(),
            FirstName = model.FirstName,
            LastName = model.LastName,
            Patronymic = model.Patronymic,
            Email = model.Email,
            ShopId = model.ShopId,
            PhoneNumber = model.Phone
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
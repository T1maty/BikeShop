using BikeShop.Identity.Domain;
using BikeShop.Identity.WebApi.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BikeShop.Identity.WebApi.Controllers;

public class AuthController : ControllerBase
{
    private readonly SignInManager<BikeShopUser> _signInManager;
    private readonly UserManager<BikeShopUser> _userManager;
    private readonly IIdentityServerInteractionService _interactionService;

    public AuthController(SignInManager<BikeShopUser> signInManager, UserManager<BikeShopUser> userManager,
        IIdentityServerInteractionService interactionService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _interactionService = interactionService;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody]LoginModel viewModel)
    {
        var user = await _userManager.FindByNameAsync(viewModel.Username);
        if (user == null)
        {
            ModelState.AddModelError(string.Empty, "User not found");
            return NotFound(viewModel);
        }

        var result = await _signInManager.PasswordSignInAsync(viewModel.Username,
            viewModel.Password, false, false);
        if (result.Succeeded)
        {
            return Ok();
            
            
        }

        ModelState.AddModelError(string.Empty, "Login error");
        return BadRequest(ModelState);
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

        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, false);
            return Ok();
        }

        return BadRequest();
    }
}
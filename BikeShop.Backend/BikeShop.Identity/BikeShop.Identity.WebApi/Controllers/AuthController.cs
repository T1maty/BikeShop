using BikeShop.Identity.Application.Services;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.WebApi.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Identity.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly JwtService _jwtService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(ILogger<AuthController> logger, JwtService jwtService, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _jwtService = jwtService;
        _userManager = userManager;
        _signInManager = signInManager;
    }
    
    [HttpPost("login")]
        public async Task<IActionResult> LoginApi([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var signIn = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

                if (signIn.Succeeded)
                {
                    var user = await _userManager.FindByEmailAsync(model.Username);
                    
                    var roles = await _userManager.GetRolesAsync(user);
                    var token = _jwtService.GenerateUserJwt(user, roles);

                    user.RefreshToken = Guid.NewGuid();

                    await _userManager.UpdateAsync(user);

                    Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                    Response.Cookies.Append("X-Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                    Response.Cookies.Append("X-Refresh-Token", user.RefreshToken.ToString(), new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

                    return Ok();
                }
                else
                {
                    return BadRequest(new { signIn.IsLockedOut, signIn.IsNotAllowed, signIn.RequiresTwoFactor });
                }
            }
            else
                return BadRequest(ModelState);
        }
        
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // [HttpGet("ping")]
        // public string Ping() => "pong";
        
        

        [HttpGet("refresh")]
        public async Task<IActionResult> Refresh()
        {
            if (!(Request.Cookies.TryGetValue("X-Username", out var userName) && Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken)))
                return BadRequest();

            var user = await _userManager.Users
                .FirstOrDefaultAsync(i => i.UserName == userName 
                                     && i.RefreshToken == Guid.Parse(refreshToken));
            
            var roles = await _userManager.GetRolesAsync(user);

            if (user is null)
                return BadRequest();

            var token = _jwtService.GenerateUserJwt(user, roles);

            user.RefreshToken = Guid.NewGuid();

            await _userManager.UpdateAsync(user);

            Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("X-Username", user.UserName, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("X-Refresh-Token", user.RefreshToken.ToString(), new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok();
        }
}
using BikeShop.Identity.Application.Exceptions;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Application.Services;
using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Request.Social;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.WebApi.Models.Auth;
using BikeShop.Identity.WebApi.Models.Validation;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers;

// Всё связанное с выдачей токенов и сессией
[ApiController]
[Route("auth")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Логин пользователя и создании сессии. Получение JWT-токенов доступа и рефреша.
    /// </summary>
    /// 
    /// <remarks>
    /// Указывается ИЛИ телефон, ИЛИ почта. Если и то и другое будет пустым - ответ 400
    /// </remarks>
    /// 
    /// <param name="requestModel">Модель входа в аккаунт</param>
    /// <returns>JWT access token в теле, refresh token в http-only cookie (X-Refresh-Token) при успехе. Модель ошибки при неудаче</returns>
    /// 
    /// <response code="200">Успешный вход</response>
    /// <response code="400">И телефон и почта не указаны (phone_email_null) / Неправильный пароль (incorrect_password)</response>
    /// <response code="404">Пользователь с такими учетными данными не найден (user_not_found)</response>
    /// <response code="422">Невалидная модель (например не указан пароль)</response>
    [HttpPost("login")]
    public async Task<LoginResponseModel> Login([FromBody] LoginRequestModel dto)
    {
        var User = await _authService.Login(dto);
        return await _authService.AppUserLoginTokensAsync(User, HttpContext);
    }

    /// <summary>
    /// Регистрация нового пользователя
    /// </summary>
    /// 
    /// <remarks>
    /// Создание нового пользователя в базе с указанными данными. Возвращает созданного юзера. Обязательные поля - телефон и пароль. Остально - опционально
    /// </remarks>
    /// 
    /// <param name="model">Модель регистрации пользователя</param>
    /// <returns>Ничего. Модель ошибки при неудаче.</returns>
    /// 
    /// <response code="200">Успешно зарегистрирован</response>
    /// <response code="400">Скорее всего, пароль не подходит по требованиям (error_registration)</response>
    /// <response code="409">Пользователь с указанным телефоном уже существует (phone_already_exists)</response>
    /// <response code="422">Невалидная модель (например не указаны обязательные поля)</response>
    [HttpPost("register")]
    [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
    public async Task<UserResponseWithRoles> Register(RegisterFullDTO dto)
    {
        return await _authService.Register(dto);
    }

    /// <summary>
    /// Обновление токенов для пользователя. Фактически обновлении сессии. 
    /// </summary>
    /// 
    /// <remarks>
    /// Берёт с cookie X-Refresh-Token рефреш токен, и если есть сессия на этот токен - обновляет её и возвращает новые токены.
    /// </remarks>
    /// 
    /// <param>Refresh token в cookie X-Refresh-Token</param>
    /// <returns>JWT access token в теле, refresh token в http-only cookie (X-Refresh-Token) при успехе. Модель ошибки при неудаче.</returns>
    /// 
    /// <response code="200">Успешное обновлении сессии</response>
    /// <response code="404">Не найдена сессия на переданный refresh токен / Не найден пользователь, который привязан к сессии.</response>
    /// <response code="406">Не передан cookie X-Refresh-Token с рефреш токеном</response>
    [HttpPost("refresh")]
    public async Task<ActionResult<AccessTokenModel>> Refresh()
    {
        var token = await _authService.Refresh(HttpContext);
        return Ok(new AccessTokenModel { AccessToken = token });
    }

    /// <summary>
    /// Логаут. Удаление куки с рефреш токеном.
    /// </summary>
    /// 
    /// <remarks>
    /// Удаляет куки X-Refresh-Token с рефреш токеном. Удаляет сессию.
    /// </remarks>
    ///
    /// <param>Refresh token в cookie X-Refresh-Token</param>
    /// 
    /// <returns>Ничего. Модель ошибки в случае неудачи</returns>
    /// <response code="200">Успешный логаут. Куки удален.</response>
    /// <response code="404">Не найдена сессия с переданным refresh токеном</response>
    /// <response code="406">Не передан cookie X-Refresh-Token с рефреш токеном</response>
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _authService.Logout(HttpContext);
        return Ok();
    }

    [HttpPost("sociallogin")]
    public async Task<LoginResponseModel> SocialLogin([FromBody] SocialLoginDTO dto)
    {
        var user = await _authService.SocialLogin(dto);
        return await _authService.AppUserLoginTokensAsync(user, HttpContext);
        
    }

    [HttpPost("socialregister")]
    public async Task<LoginResponseModel> SocialRegister(SocialRegisterDTO dto)
    {
        var User = await _authService.SocialRegister(dto);

        return await _authService.AppUserLoginTokensAsync(User, HttpContext);
    }

}
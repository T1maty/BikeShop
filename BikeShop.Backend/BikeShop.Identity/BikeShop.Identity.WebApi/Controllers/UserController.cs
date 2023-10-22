using System.Security.Claims;
using BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;
using BikeShop.Identity.Application.DTO;
using BikeShop.Identity.Application.Interfaces;
using BikeShop.Identity.Application.Services;
using BikeShop.Identity.Domain.DTO.Request;
using BikeShop.Identity.Domain.DTO.Response;
using BikeShop.Identity.Domain.Entities;
using BikeShop.Identity.WebApi.Models.Auth;
using BikeShop.Identity.WebApi.Models.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Identity.WebApi.Controllers;

// Все для работы с данными пользователей. Получение, редактирование, ...
[ApiController]
[Route("user")]
[Produces("application/json")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly JwtService _jwtService; // для генерации JWT-токенов
    private readonly CookieService _cookieService; // для вставки рефреш токена в куки

    public UserController(IUserService userService, JwtService jwtService, CookieService cookieService)
    {
        _userService = userService;
        _jwtService = jwtService;
        _cookieService = cookieService;
    }


    /// <summary>
    /// Обновление публичной даты пользователя (ФИО, почта)
    /// </summary>
    /// 
    /// <remarks>
    /// В HTTP Headers необходимо передать Access Token (Authorization: Bearer ey...). По нему происходит идентификация пользователя
    /// </remarks>
    ///
    /// <param name="model">Публичные данные о пользователе</param>
    /// 
    /// <returns>Ничего. Модель ошибки в случае неудачи</returns>
    /// <response code="200">Успешное изменение</response>
    /// <response code="400">В access токене не указан id пользователя</response>
    /// <response code="401">Не передан access токен</response>
    /// <response code="404">Пользователь с указанным id не найден</response>
    /// <response code="409">Указанная почта уже зарегистрирована на какого-то пользователя</response>
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPut("updatepublic")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status406NotAcceptable)]
    public async Task<IActionResult> UpdateUserPublic([FromBody] UpdateUserPublicModel model)
    {
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
        await _userService.UpdatePublic(model, id);
        return Ok();
    }

    /// <summary>
    /// Создание нового пользователя
    /// </summary>
    /// 
    /// <remarks>
    /// Создание нового пользователя в базе с указанными данными с автогенерацией пароля. Ничего не возвращает.
    /// </remarks>
    /// 
    /// <param name="model">Модель создания пользователя</param>
    /// <returns>Ничего. Модель ошибки при неудаче.</returns>
    /// <response code="200">Успешно создан</response>
    /// <response code="400">Пользователь с указанным телефоном/паролем уже существует</response>
    /// <response code="422">Невалидная модель (например не указаны обязательные поля)</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ApplicationUser> CreateUser([FromBody] CreateUserDTO dto)
    {
        return await _userService.CreateUser(dto);
    }

    /// <summary>
    /// Поиск всех пользователей по части ФИО/номера
    /// </summary>
    /// 
    /// <remarks>
    /// При указании одного из полей - ищет только по нему. При указании и того и другого
    /// - ищет пользователя у которого И совпал кусок ФИО И телефона
    /// </remarks>
    /// 
    /// <param name="model">Модель с полями для поиска пользователя</param>
    /// <returns>Список найденных пользователей</returns>
    /// 
    /// <response code="200">Успех. Возвращает найденных пользователей</response>
    /// <response code="400">Не указано ни ФИО, ни телефон</response>
    /// <response code="422">Невалидная модель</response>
    [HttpGet("find")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<UserModelListModel>> GetUsersByPhoneOrFio([FromQuery] GetUserByPhoneOrFioModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        return Ok(await _userService.GetUsersByPhoneOrFio(model));
    }

    [HttpGet("getbyid")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<UserDTO?> GetById([FromQuery]Guid id)
    {
        return await _userService.GetUserById(id);
    }

    [HttpPost("getdictionary")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<Dictionary<string, UserDTO>> GetDictionary([FromBody] List<string> guids)
    {
        return await _userService.GetUsersDictionary(guids);
    }

    [HttpPost("changeshop")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> ChangeShop(Guid userId, int shopId)
    {
        await _userService.SetUsersShop(userId, shopId);
        return Ok();
    }

    [HttpGet("search")]
    public async Task<List<UserWithRoles>> Search(string Querry, int Take)
    {
        return await _userService.Search(Querry, Take);
    }

    [HttpGet("GetEmployees")]
    public async Task<List<UserWithRoles>> GetEmployees(int ShopId)
    {
        return await _userService.GetEmployees(ShopId);
    }

    [HttpPut("setrole")]
    public async Task SetRole(Guid user, string role)
    {
        await _userService.addUserToRole(user, role);
    }

    [HttpPut("regeneratesecrete")]
    public async Task<string> RegenerateSecret(Guid user)
    {
        return await _userService.RegenerateSecret(user);
    }

    [HttpPost("getFromBRUA")]
    public async Task<string> gfb()
    {
        return await _userService.gfb();
    }



}
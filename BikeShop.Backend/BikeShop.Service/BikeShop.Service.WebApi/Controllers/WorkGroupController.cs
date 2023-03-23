using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.WorkGroup;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Service.WebApi.Controllers;

[ApiController]
[Route("group")]
public class GroupController : ControllerBase
{
    private readonly IWorkGroupService _workGroupService;

    public GroupController(IWorkGroupService workGroupService)
    {
        _workGroupService = workGroupService;
    }


    /// <summary>
    /// Получение всех групп услуг по айди магазина
    /// </summary>
    ///
    /// <param name="id">ID магазина</param>
    /// <returns>Возвращает модель, хранящую массив со всеми группами услуг в магазине</returns>
    ///
    /// <response code="200">Успех. Возвращает массив групп услуг.</response>
    [HttpGet("getbyshopid/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<WorkGroup>> GetWorkGroupsByShopId(int id)
    {
        return await _workGroupService.GetWorkGroupsByShopId(id);
    }

    /// <summary>
    /// Создание группы услуг в магазине
    /// </summary>
    ///
    /// <param name="model">Модель создания группы услуг</param>
    /// <returns>Ничего</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="400">Группа услуг с таким названием уже есть в магазине</response>
    /// <response code="404">Не найдена родительская группа с указанным parentId</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<WorkGroup> CreateWorkGroup([FromBody] CreateWorkGroupModel model)
    {
        return await _workGroupService.CreateWorkGroup(model);
    }

    /// <summary>
    /// Обновление группы услуг в магазине
    /// </summary>
    /// 
    /// <param name="model">Модель обновления группы услуг</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="400">Группа услуг с таким названием уже есть в магазине</response>
    /// <response code="404">Не найдена группа с указанным id / Не найдена родительская группа с указанным parentId</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<WorkGroup> UpdateWorkGroup([FromBody] UpdateWorkGroupModel model)
    {
        return await _workGroupService.UpdateWorkGroup(model);
    }
}
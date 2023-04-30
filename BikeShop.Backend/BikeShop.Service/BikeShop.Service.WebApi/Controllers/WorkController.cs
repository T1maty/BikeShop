using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.Work;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Service.WebApi.Controllers;

[Produces("application/json")]
[ApiController]
[Route("work")]
public class WorkController : ControllerBase
{
    private readonly IWorkService _workService;

    public WorkController(IWorkService workService)
    {
        _workService = workService;
    }


    /// <summary>
    /// Получение списка всех услуг по id группы услуг
    /// </summary>
    /// 
    /// <param name="id">ID группы услуг (WorkGroup)</param>
    /// <returns>Возвращает модель, хранящую массив со всеми услугами касающихся указанной группы услуг</returns>
    ///
    /// <response code="200">Успех. Возвращает массив услуг</response>
    [HttpGet("getbygroupid/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Work>> GetWorksByGroupId(int id)
    {
        return await _workService.GetWorksByGroupId(id);
    }


    /// <summary>
    /// Создание услуги в группе услуг
    /// </summary>
    /// 
    /// <param name="model">Модель создания услуги</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="404">Не найдена группа услуг с таким id</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<Work> CreateWork([FromBody] CreateWorkModel model)
    {
        return await _workService.CreateWork(model);
    }

    /// <summary>
    /// Обновление услуги в группе услуг
    /// </summary>
    /// 
    /// <param name="model">Модель обновления услуги</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Успех</response>
    /// <response code="404">Услуга с указанным id не найдена</response>
    /// <response code="422">Невалидная модель</response>
    [HttpPut("update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<Work> UpdateWork([FromBody] UpdateWorkModel model)
    {
        return await _workService.UpdateWork(model);
    }

    [HttpGet("search")]
    public async Task<List<Work>> Search(string Querry)
    {
        return await _workService.Search(Querry);
    }
}
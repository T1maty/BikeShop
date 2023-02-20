using AutoMapper;
using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateService;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateServiceStatus;
using BikeShop.Service.Application.CQRS.Queries.Service.GetOngoingServicesByShopId;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.WebApi.Models.Service;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Service.WebApi.Controllers;

[ApiController]
[Route("service")]
[Produces("application/json")]
public class ServiceController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;
    private readonly IServiceService _serviceService;

    public ServiceController(IMapper mapper, IMediator mediator, IServiceService serviceService)
    {
        _mapper = mapper;
        _mediator = mediator;
        _serviceService = serviceService;
    }

    /// <summary>
    /// Получение списка всех сервисов/ремонтов по id магазина со статусом НЕ удален или ВЫПОЛНЕН
    /// </summary>
    ///
    /// <param name="shopid">ID магазина</param>
    /// <returns>Возвращает модель, хранящую массив со всеми сервисами/ремонтами с указанным id магазина</returns>
    ///
    /// <response code="200">Успех. Возвращает массив сервисов/ремонтов</response>
    [HttpGet("getbyshopid/{shopid:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<GetServiceDTO>>> GetOngoingServicesByShopId(int shopid)
    {
        var model = await _serviceService.GetServiceByShopId(shopid);

        return Ok(model);
    }



    /// <summary>
    /// Обновление информации о сервисе/ремонте
    /// </summary>
    ///
    /// <remarks>Все поля обязательны</remarks>
    /// 
    /// <param name="model">Модель обновления сервиса/ремонта</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Модель успешно обновлена</response>
    /// <response code="400">Переданы некорректные поля, например user id не GUID</response>
    /// <response code="404">Не найден сервис/ремонт с указанным id</response>
    /// <response code="422">Невалидная модель обновления</response>
    [HttpPut("updateservice")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(IException), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> UpdateService([FromBody] UpdateServiceDTO model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        await _serviceService.Update(model);

        return Ok();
    }

    /// <summary>
    /// Обновление статуса сервиса/ремонта
    /// </summary>
    ///
    /// <remarks>Статус - enum, для фронта - число от 0 до 6</remarks>
    /// 
    /// <param name="model">Модель обновления статуса сервиса/ремонта</param>
    /// <returns>Ничего / Модель ошибки</returns>
    ///
    /// <response code="200">Статус успешно обновлен</response>
    /// <response code="400">Некорректный статус</response>
    /// <response code="404">Не найден сервис/ремонт с указанным id</response>
    /// <response code="422">Невалидная модель обновления</response>
    [HttpPut("updateservicestatus")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(IException), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> UpdateServiceStatus([FromBody] UpdateServiceStatusModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var command = _mapper.Map<UpdateServiceStatusCommand>(model);
        await _mediator.Send(command);

        return Ok();
    }
    
    [HttpPost("create")]
    public async Task<CreateServiceDTO> Create([FromBody] CreateServiceModel model)
    {

        return await _serviceService.CreateService(model, new CancellationTokenSource().Token);
    }
}
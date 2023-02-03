using AutoMapper;
using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateService;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateServiceStatus;
using BikeShop.Service.Application.CQRS.Queries.Service.GetOngoingServicesByShopId;
using BikeShop.Service.Application.CQRS.Queries.Service.GetServiceById;
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

    public ServiceController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
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
    public async Task<ActionResult<OngoingServicesModel>> GetOngoingServicesByShopId(int shopid)
    {
        var query = new GetOngoingServicesByShopIdQuery { ShopId = shopid };
        var model = await _mediator.Send(query);

        return Ok(model);
    }


    /// <summary>
    /// Получение полной информации о cервисе/ремонте по айди
    /// </summary>
    ///
    /// <param name="serviceid">ID сервиса/ремонта</param>
    /// <returns>Возвращает полную информацию о сервисе/ремонте с указанным id</returns>
    ///
    /// <response code="200">Успех. Возвращает сервис/ремонт с указанным id</response>
    /// <response code="404">Cервис с указанным id не найден</response>
    [HttpGet("getserviceinfo/{serviceid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(IException), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Domain.Entities.Service>> GetService(int serviceid)
    {
        var query = new GetServiceByIdQuery { ServiceId = serviceid };

        var service = await _mediator.Send(query);

        return Ok(service);
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
    public async Task<IActionResult> UpdateService([FromBody] UpdateServiceModel model)
    {
        if (!ModelState.IsValid)
            return UnprocessableEntity(ModelState);

        var command = _mapper.Map<UpdateServiceCommand>(model);
        await _mediator.Send(command);

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
}
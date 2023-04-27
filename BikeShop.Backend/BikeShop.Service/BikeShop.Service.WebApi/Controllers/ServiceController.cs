using AutoMapper;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.DTO.Response;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.Service;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Service.WebApi.Controllers;

[ApiController]
[Route("service")]
[Produces("application/json")]
public class ServiceController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IServiceService _serviceService;

    public ServiceController(IMapper mapper, IServiceService serviceService)
    {
        _mapper = mapper;
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
    public async Task<ActionResult<List<ServiceWithProductsWorksDTO>>> GetOngoingServicesByShopId(int shopid)
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
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ServiceWithProductsWorksDTO> UpdateService([FromBody] UpdateServiceDTO model)
    {
        return await _serviceService.Update(model);
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
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ServiceWithProductsWorksDTO> UpdateServiceStatus([FromQuery] string status, int id)
    {
        return await _serviceService.UpdateStatus(status, id);
    }
    
    [HttpPost("create")]
    public async Task<ServiceWithProductsWorksDTO> Create([FromBody] CreateServiceModel model)
    {

        return await _serviceService.CreateService(model);
    }

    [HttpGet("getbyid")]
    public async Task<ServiceWithProductsWorksDTO> GetById([FromQuery] int Id)
    {

        return await _serviceService.GetServiceById(Id);
    }

    [HttpGet("getworksbymaster")]
    public async Task<List<ServiceWork>> GetWorksByMaster(Guid userId)
    {

        return await _serviceService.GetWorksByMaster(userId);
    }

    [HttpGet("getproductsbymaster")]
    public async Task<List<ServiceProduct>> GetProductsByMaster(Guid userId)
    {

        return await _serviceService.GetProductsByMaster(userId);
    }
}
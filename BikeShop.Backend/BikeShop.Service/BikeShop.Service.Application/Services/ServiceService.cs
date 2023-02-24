using AutoMapper;
using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Application.DTO.UpdateService;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.Domain.Enums;
using BikeShop.Service.WebApi.Models.Service;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BikeShop.Service.Application.Services;

public class ServiceService : IServiceService
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IProductsClient _productClient;
    private readonly IIdentityClient _identityClient;

    public ServiceService(IApplicationDbContext context, IMapper mapper, IProductsClient productClient, IIdentityClient identityClient)
    {
        _context = context;
        _mapper = mapper;
        _productClient = productClient;
        _identityClient = identityClient;
    }

    public async Task<GetServiceDTO> CreateService(CreateServiceModel model, CancellationToken cancellationToken)
    {
        var service = _mapper.Map<CreateServiceDTO>(model);

        var serviceWorks = _mapper.ProjectTo<ServiceWorkModel>(model.ServiceWorks.AsQueryable()).ToList();
        var serviceProducts = _mapper.ProjectTo<ServiceProductModel>(model.ServiceProducts.AsQueryable()).ToList();

        await _context.Services.AddAsync(service);
        await _context.SaveChangesAsync(cancellationToken);

        serviceWorks.ForEach(n => n.ServiceId = service.Id);
        serviceProducts.ForEach(n => n.ServiceId = service.Id);

        await _context.ServiceWorks.AddRangeAsync(serviceWorks);
        await _context.ServiceProducts.AddRangeAsync(serviceProducts);

        await _context.SaveChangesAsync(cancellationToken);

        var r = await GetServiceById(service.Id);

        return r;
    }

    public async Task<GetServiceDTO> GetServiceById(int Id)
    {
        //Достаем сущность ремонта и мапим ее в сущность для ответа
        var services = _context.Services.Where(n => n.Id == Id);
        var servicesModel = await _mapper.ProjectTo<GetServiceDTO>(services).ToListAsync();

        //Подтягиваем все услуги ремонта
        servicesModel.ForEach(async service => {
            service.Works = await _context.ServiceWorks.Where(n => n.Id == service.Id).ToListAsync();
        });

        //Подтягиваем все товары
        servicesModel.ForEach(async service => {
            service.Products = await _context.ServiceProducts.Where(n => n.Id == service.Id).ToListAsync();
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().ClientId);
            service.Client = user;
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().UserCreatedId);
            service.UserCreated = user;
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().UserMasterId);
            service.UserMaster = user;
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().UserDeletedId);
            service.UserDeleted = user;
        });

        return servicesModel.First();
    }

    public async Task<List<GetServiceDTO>> GetServiceByShopId(int ShopId)
    {
        //Достаем сущность ремонта и мапим ее в сущность для ответа
        var services = _context.Services.Where(n => n.ShopId == ShopId);
        var servicesModel =await _mapper.ProjectTo<GetServiceDTO>(services).ToListAsync();

        //Подтягиваем все услуги ремонта
        servicesModel.ForEach(async service => {
            service.Works = await _context.ServiceWorks.Where(n => n.Id == service.Id).ToListAsync();
        });

        //Подтягиваем все товары
        servicesModel.ForEach(async service => {
            service.Products = await _context.ServiceProducts.Where(n => n.Id == service.Id).ToListAsync();
        });

        servicesModel.ForEach(async service =>{
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().ClientId);
            service.Client = user;
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().UserCreatedId);
            service.UserCreated = user;
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().UserMasterId);
            service.UserMaster = user;
        });

        servicesModel.ForEach(async service => {
            var user = await _identityClient.GetById(services.Where(n => n.Id == service.Id).First().UserDeletedId);
            service.UserDeleted = user;
        });

        return servicesModel;
    }

    public async Task Update(UpdateServiceDTO dto)
    {
        var serviceCont = await _context.Services.FindAsync(dto.Id);

        serviceCont.Name = dto.Name;
        serviceCont.ClientDescription = dto.ClientDescription;
        serviceCont.UserMasterDescription = dto.UserMasterDescription;
        serviceCont.UserCreatedDescription = dto.UserCreatedDescription;
        serviceCont.UserMasterId = dto.UserMasterId;
        serviceCont.ProductDiscountId = dto.ProductDiscountId;
        serviceCont.WorkDiscountId = dto.WorkDiscountId;

        var serviceWorks = _mapper.ProjectTo<ServiceWorkModel>(dto.ServiceWorks.AsQueryable()).ToList();
        var serviceProducts = _mapper.ProjectTo<ServiceProductModel>(dto.ServiceProducts.AsQueryable()).ToList();

        _context.ServiceWorks.RemoveRange(_context.ServiceWorks.Where(n => n.ServiceId == dto.Id));
        _context.ServiceProducts.RemoveRange(_context.ServiceProducts.Where(n => n.ServiceId == dto.Id));

        serviceWorks.ForEach(n => n.ServiceId = serviceCont.Id);
        serviceProducts.ForEach(n => n.ServiceId = serviceCont.Id);

        await _context.ServiceWorks.AddRangeAsync(serviceWorks);
        await _context.ServiceProducts.AddRangeAsync(serviceProducts);

        await _context.SaveChangesAsync(new CancellationToken());
    }

    public async Task UpdateStatus(string status, int id)
    {
        if (StatusDict.Get().ContainsKey(status))
        {
            var service = await _context.Services.FindAsync(id);
            service.Status = status;
            await _context.SaveChangesAsync(new CancellationToken());
        }
        else
        {
            throw new NotFoundException($"Status {status} not found");
        }
    }
}
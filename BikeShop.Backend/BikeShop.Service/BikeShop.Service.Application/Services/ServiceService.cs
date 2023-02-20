using AutoMapper;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Application.DTO.UpdateService;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.Service;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Application.Services;

public class ServiceService : IServiceService
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IProductsClient _productClient;

    public ServiceService(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CreateServiceDTO> CreateService(CreateServiceModel model, CancellationToken cancellationToken)
    {
        var service = _mapper.Map<CreateServiceDTO>(model);
        _context.Services.Add(service);
        await _context.SaveChangesAsync(cancellationToken);

        return service;
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

        var serviceWorks = _mapper.ProjectTo<ServiceWorkModel>(dto.ServiceWorks.AsQueryable());
        var serviceProducts = _mapper.ProjectTo<ServiceProductModel>(dto.ServiceProducts.AsQueryable());

        _context.ServiceWorks.RemoveRange(_context.ServiceWorks.Where(n => n.ServiceId == dto.Id));
        _context.ServiceProducts.RemoveRange(_context.ServiceProducts.Where(n => n.ServiceId == dto.Id));

        foreach(var item in serviceWorks) { item.ServiceId = serviceCont.Id; }
        foreach(var item in serviceProducts) { item.ServiceId = serviceCont.Id; }

        //await _context.ServiceWorks.AddRange(serviceWorks);
        //await _context.ServiceProducts.AddRangeAsync(serviceProducts);

        await _context.SaveChangesAsync(new CancellationToken());
    }
}
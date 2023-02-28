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
    private readonly IIdentityClient _identityClient;

    public ServiceService(IApplicationDbContext context, IMapper mapper, IIdentityClient identityClient)
    {
        _context = context;
        _mapper = mapper;
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
        var servicesDict = services.ToDictionary(n => n.Id, n => n);

        var usersToFind = new List<string>();

        foreach (var n in services)
        {
            if (!usersToFind.Contains(n.ClientId.ToString())) usersToFind.Add(n.ClientId.ToString());
            if (!usersToFind.Contains(n.UserCreatedId.ToString())) usersToFind.Add(n.UserCreatedId.ToString());
            if (!usersToFind.Contains(n.UserDeletedId.ToString())) usersToFind.Add(n.UserDeletedId.ToString());
            if (!usersToFind.Contains(n.UserMasterId.ToString())) usersToFind.Add(n.UserMasterId.ToString());
        }

        var usersDitionary = await _identityClient.GetDictionary(usersToFind);

        servicesModel.ForEach(service => {
            service.Works = _context.ServiceWorks.Where(n => n.ServiceId == service.Id).ToList();
            service.Products = _context.ServiceProducts.Where(n => n.ServiceId == service.Id).ToList();

            var clientId = servicesDict[service.Id].ClientId.ToString();
            service.Client = usersDitionary.ContainsKey(clientId) ? usersDitionary[clientId] : null;

            var userCreatedId = servicesDict[service.Id].UserCreatedId.ToString();
            service.UserCreated = usersDitionary.ContainsKey(userCreatedId) ? usersDitionary[userCreatedId] : null;

            var userDeletedId = servicesDict[service.Id].UserDeletedId.ToString();
            service.UserDeleted = usersDitionary.ContainsKey(userDeletedId) ? usersDitionary[userDeletedId] : null;

            var userMasterId = servicesDict[service.Id].UserMasterId.ToString();
            service.UserMaster = usersDitionary.ContainsKey(userMasterId) ? usersDitionary[userMasterId] : null;
        });

        return servicesModel.First();
    }

    public async Task<List<GetServiceDTO>> GetServiceByShopId(int ShopId)
    {
        //Достаем сущность ремонта и мапим ее в сущность для ответа
        var services = _context.Services.Where(n => n.ShopId == ShopId);
        var servicesModel =await _mapper.ProjectTo<GetServiceDTO>(services).ToListAsync();

        var usersToFind = new List<string>();

        foreach (var n in services)
        {
            if (!usersToFind.Contains(n.ClientId.ToString())) usersToFind.Add(n.ClientId.ToString());
            if (!usersToFind.Contains(n.UserCreatedId.ToString())) usersToFind.Add(n.UserCreatedId.ToString());
            if (!usersToFind.Contains(n.UserDeletedId.ToString())) usersToFind.Add(n.UserDeletedId.ToString());
            if (!usersToFind.Contains(n.UserMasterId.ToString())) usersToFind.Add(n.UserMasterId.ToString());
        }

        var usersDitionary = await _identityClient.GetDictionary(usersToFind);
        
        servicesModel.ForEach(service => {
            service.Works = _context.ServiceWorks.Where(n => n.ServiceId == service.Id).ToList();
            service.Products = _context.ServiceProducts.Where(n => n.ServiceId == service.Id).ToList();

            var clientId = services.Where(n => n.Id == service.Id).First().ClientId.ToString();
            service.Client = usersDitionary.ContainsKey(clientId) ? usersDitionary[clientId]:null;

            var userCreatedId = services.Where(n => n.Id == service.Id).First().UserCreatedId.ToString();
            service.UserCreated = usersDitionary.ContainsKey(userCreatedId) ? usersDitionary[userCreatedId] : null;

            var userDeletedId = services.Where(n => n.Id == service.Id).First().UserDeletedId.ToString();
            service.UserDeleted = usersDitionary.ContainsKey(userDeletedId) ? usersDitionary[userDeletedId] : null;

            var userMasterId = services.Where(n => n.Id == service.Id).First().UserMasterId.ToString();
            service.UserMaster = usersDitionary.ContainsKey(userMasterId) ? usersDitionary[userMasterId] : null;
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
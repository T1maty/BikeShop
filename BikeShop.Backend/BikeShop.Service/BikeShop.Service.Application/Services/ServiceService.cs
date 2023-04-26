using AutoMapper;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.Domain.Enums;
using BikeShop.Service.Domain.RefitDTO;
using BikeShop.Service.WebApi.Models.Service;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BikeShop.Service.Application.Services;

public class ServiceService : IServiceService
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityClient _identityClient;
    private readonly IProductsClient _productsClient;
    private readonly IShopClient _shopClient;

    public ServiceService(IApplicationDbContext context, IMapper mapper, IIdentityClient identityClient, IProductsClient productsClient, IShopClient shopClient)
    {
        _context = context;
        _mapper = mapper;
        _identityClient = identityClient;
        _productsClient = productsClient;
        _shopClient = shopClient;
    }

    public async Task<GetServiceDTO> CreateService(CreateServiceModel model)
    {
        var service = _mapper.Map<Domain.Entities.Service>(model);

        service.UserCreatedId = model.UserId;
        service.ClientId = model.Client.Id;

        var serviceWorks = _mapper.ProjectTo<ServiceWork>(model.ServiceWorks.AsQueryable()).ToList();
        var serviceProducts = _mapper.ProjectTo<ServiceProduct>(model.ServiceProducts.AsQueryable()).ToList();

        serviceWorks.ForEach(n => n.Total = (n.Quantity * n.Price) - n.Discount);
        serviceProducts.ForEach(n => n.Total = (n.Quantity * n.Price) - n.Discount);

        service.PriceProduct = serviceProducts.Select(n => n.Total).Sum();
        service.DiscountProduct = serviceProducts.Select(n => n.Discount).Sum();
        service.TotalProduct = service.PriceProduct - service.DiscountProduct;

        service.PriceWork = serviceWorks.Select(n => n.Total).Sum();
        service.DiscountWork = serviceWorks.Select(n => n.Discount).Sum();
        service.TotalWork = service.PriceWork - service.DiscountWork;

        await UpdateReservation(new List<ServiceProduct>(), serviceProducts, await _shopClient.GetStorageId(model.ShopId));

        await _context.Services.AddAsync(service);
        await _context.SaveChangesAsync(new CancellationToken());

        serviceWorks.ForEach(n => n.ServiceId = service.Id);
        serviceProducts.ForEach(n => n.ServiceId = service.Id);

        await _context.ServiceWorks.AddRangeAsync(serviceWorks);
        await _context.ServiceProducts.AddRangeAsync(serviceProducts);

        await _context.SaveChangesAsync(new CancellationToken());

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
        var servicesModel = await _mapper.ProjectTo<GetServiceDTO>(services).ToListAsync();
        var servicesList = await services.ToListAsync();
        
        var usersToFind = new List<string>();
        
        foreach (var n in services)
        {
            if (!usersToFind.Contains(n.ClientId.ToString())) usersToFind.Add(n.ClientId.ToString());
            if (!usersToFind.Contains(n.UserCreatedId.ToString())) usersToFind.Add(n.UserCreatedId.ToString());
            if (!usersToFind.Contains(n.UserDeletedId.ToString())) usersToFind.Add(n.UserDeletedId.ToString());
            if (!usersToFind.Contains(n.UserMasterId.ToString())) usersToFind.Add(n.UserMasterId.ToString());
        }
        
        var usersDitionary = await _identityClient.GetDictionary(usersToFind);
        
        //var usersDitionary = new Dictionary<string, UserDTO>();
        var servicesIds = servicesList.Select(s => s.Id).ToList();
        var allWorks = await _context.ServiceWorks.Where(n => servicesIds.Contains(n.ServiceId)).ToListAsync();
        var allProducts = await _context.ServiceProducts.Where(n => servicesIds.Contains(n.ServiceId)).ToListAsync();
        
        servicesModel.ForEach(service => {
            service.Works = allWorks.Where(n=>n.ServiceId == service.Id).ToList();
            service.Products = allProducts.Where(n=>n.ServiceId == service.Id).ToList();

            var clientId = servicesList.Where(n => n.Id == service.Id).First().ClientId.ToString();
            service.Client = usersDitionary.ContainsKey(clientId) ? usersDitionary[clientId]:null;

            var userCreatedId = servicesList.Where(n => n.Id == service.Id).First().UserCreatedId.ToString();
            service.UserCreated = usersDitionary.ContainsKey(userCreatedId) ? usersDitionary[userCreatedId] : null;

            var userDeletedId = servicesList.Where(n => n.Id == service.Id).First().UserDeletedId.ToString();
            service.UserDeleted = usersDitionary.ContainsKey(userDeletedId) ? usersDitionary[userDeletedId] : null;

            var userMasterId = servicesList.Where(n => n.Id == service.Id).First().UserMasterId.ToString();
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
        serviceCont.UserUpdatedId = dto.UserId;
        serviceCont.UpdatedAt = DateTime.Now;

        var serviceWorks = _mapper.ProjectTo<ServiceWork>(dto.ServiceWorks.AsQueryable()).ToList();
        var serviceProducts = _mapper.ProjectTo<ServiceProduct>(dto.ServiceProducts.AsQueryable()).ToList();

        serviceWorks.ForEach(n => n.Total = (n.Quantity * n.Price) - n.Discount);
        serviceProducts.ForEach(n => n.Total = (n.Quantity * n.Price) - n.Discount);

        serviceCont.PriceProduct = serviceProducts.Select(n => n.Total).Sum();
        serviceCont.DiscountProduct = serviceProducts.Select(n => n.Discount).Sum();
        serviceCont.TotalProduct = serviceCont.PriceProduct - serviceCont.DiscountProduct;

        serviceCont.PriceWork = serviceWorks.Select(n => n.Total).Sum();
        serviceCont.DiscountWork = serviceWorks.Select(n => n.Discount).Sum();
        serviceCont.TotalWork = serviceCont.PriceWork - serviceCont.DiscountWork;

        var oldServiceProducts = await _context.ServiceProducts.Where(n => n.ServiceId == dto.Id).ToListAsync();
        await UpdateReservation(oldServiceProducts, serviceProducts, await _shopClient.GetStorageId(serviceCont.ShopId));

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

            if(status == "Ended")
            {
                var storageId = await _shopClient.GetStorageId(service.ShopId);
                var oldServiceProducts = await _context.ServiceProducts.Where(n => n.ServiceId == id).ToListAsync();
                await UpdateReservation(oldServiceProducts, new List<ServiceProduct>(), storageId);
                await _productsClient.AddProductsToStorage(oldServiceProducts.Select(n=> new ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity*-1}).ToList(), storageId, "Service", id);
            }

            await _context.SaveChangesAsync(new CancellationToken());
        }
        else
        {
            throw Errors.StatusNotFound;
        }
    }

    private async Task UpdateReservation(List<ServiceProduct> OldProducts, List<ServiceProduct> NewProducts, int storageId)
    {
        var data = new UpdateReservationProductsDTO();
        data.OldReservationProducts = _mapper.ProjectTo<ProductQuantitySmplDTO>(OldProducts.AsQueryable()).ToList();
        data.NewReservationProducts = _mapper.ProjectTo<ProductQuantitySmplDTO>(NewProducts.AsQueryable()).ToList();
        await _productsClient.UpdateReservationProducts(data, storageId);
    }
}
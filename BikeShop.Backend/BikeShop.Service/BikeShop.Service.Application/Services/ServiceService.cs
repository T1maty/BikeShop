﻿using AutoMapper;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Service.Application.Common.Errors;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using BikeShop.Service.Domain.DTO;
using BikeShop.Service.Domain.DTO.Response;
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
    private readonly IPaymentsClient _paymentsClient;

    public ServiceService(IApplicationDbContext context, IMapper mapper, IIdentityClient identityClient, IProductsClient productsClient, IShopClient shopClient, IPaymentsClient paymentsClient)
    {
        _context = context;
        _mapper = mapper;
        _identityClient = identityClient;
        _productsClient = productsClient;
        _shopClient = shopClient;
        _paymentsClient = paymentsClient;
    }

    private async Task<Domain.Entities.Service> UpdateUsersData (Domain.Entities.Service service)
    {
        var users = await _identityClient.GetDictionary(new List<string> { service.UserUpdatedId.ToString(), service.ClientId.ToString(), service.UserMasterId.ToString() });
        UserDTO user, client, master;

        if (users.TryGetValue(service.UserUpdatedId.ToString(), out user))
        {
            service.UserFIO = "";
            service.UserPhone = user.phoneNumber;
            if (user.lastName != null) service.UserFIO += (user.lastName + " ");
            if (user.firstName != null) service.UserFIO += (user.firstName + " ");
            if (user.patronymic != null) service.UserFIO += (user.patronymic + " ");
            service.UserFIO = service.UserFIO.TrimEnd();
        }

        if (users.TryGetValue(service.ClientId.ToString(), out client))
        {
            service.ClientFIO = "";
            service.ClientPhone = client.phoneNumber;
            if (client.lastName != null) service.ClientFIO += (client.lastName + " ");
            if (client.firstName != null) service.ClientFIO += (client.firstName + " ");
            if (client.patronymic != null) service.ClientFIO += (client.patronymic + " ");
            service.ClientFIO = service.ClientFIO.TrimEnd();
        }

        if (users.TryGetValue(service.UserMasterId.ToString(), out master))
        {
            service.MasterFIO = "";
            service.MasterPhone = master.phoneNumber;
            if (master.lastName != null) service.MasterFIO += (master.lastName + " ");
            if (master.firstName != null) service.MasterFIO += (master.firstName + " ");
            if (master.patronymic != null) service.MasterFIO += (master.patronymic + " ");
            service.MasterFIO = service.MasterFIO.TrimEnd();
        }

        return service;
    }

    public async Task<ServiceWithProductsWorksDTO> CreateService(CreateServiceModel model)
    {
        var service = _mapper.Map<Domain.Entities.Service>(model);

        service.UserCreatedId = model.UserId;
        service.UserUpdatedId = model.UserId;

        service.ClientId = model.ClientId;

        service = await UpdateUsersData(service);

        var serviceWorks = new List<ServiceWork>();
        var serviceProducts = new List<ServiceProduct>();

        foreach (var work in model.ServiceWorks)
        {
            if(work.Quantity > 0)
            {
                var ent = new ServiceWork();
                ent.Name = work.Name;
                ent.Price = work.Price;
                ent.Quantity = work.Quantity;
                ent.ServiceId = 0;
                ent.ComplicationPrice = work.ComplicationPrice;
                ent.Description = work.Description;
                ent.Discount = work.Discount;
                ent.WorkId = work.WorkId;
                ent.UserId = work.UserId;
                ent.Total = ent.Price * ent.Quantity - ent.Discount;

                serviceWorks.Add(ent);
            }
        }

        foreach (var prod in model.ServiceProducts)
        {
            if (prod.Quantity > 0)
            {
                var ent = new ServiceProduct();
                
                ent.ProductId = prod.ProductId;
                ent.SerialNumber = prod.SerialNumber;
                ent.Quantity = prod.Quantity;
                ent.ServiceId = 0;
                ent.Price = prod.Price;
                ent.Discount = prod.Discount;
                ent.QuantityUnitId = prod.QuantityUnitId;
                ent.QuantityUnitName= prod.QuantityUnitName;
                ent.UserId = prod.UserId;
                ent.Total = ent.Price * ent.Quantity - ent.Discount;
                ent.Name = prod.Name;
                ent.CatalogKey = prod.CatalogKey;

                serviceProducts.Add(ent);
            }
        }

        serviceWorks.ForEach(n => n.Total = (n.Quantity * n.Price) - n.Discount + n.ComplicationPrice);
        serviceProducts.ForEach(n => n.Total = (n.Quantity * n.Price) - n.Discount);

        service.PriceProduct = serviceProducts.Select(n => n.Total).Sum();
        service.DiscountProduct = serviceProducts.Select(n => n.Discount).Sum();
        service.TotalProduct = service.PriceProduct - service.DiscountProduct;

        service.PriceWork = serviceWorks.Select(n => n.Total).Sum();
        service.DiscountWork = serviceWorks.Select(n => n.Discount).Sum();
        service.TotalWork = service.PriceWork - service.DiscountWork;

        service.Total = service.TotalWork + service.TotalProduct;
        service.Discount = service.DiscountProduct + service.DiscountWork;
        service.Price = service.Total + service.Discount;

        await UpdateReservation(new List<ProductQuantitySmplDTO>(), serviceProducts, await _shopClient.GetStorageId(model.ShopId));

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

    public async Task<List<ServiceProduct>> GetProductsByMaster(Guid? userId, DateTime Start, DateTime Finish)
    {
        var services = _context.Services.Where(n => n.Status == "Ended").Where(n => n.Enabled == true).Where(n=>n.UpdatedAt>Start).Where(n=>n.UpdatedAt<Finish).Select(n=>n.Id);
        var prods = _context.ServiceProducts.Where(n => services.Contains(n.ServiceId)).Where(n=>n.Enabled == true);
        if (userId != null) prods = prods.Where(n => n.UserId == userId);
        return await prods.ToListAsync();
    }

    public async Task<ServiceWithProductsWorksDTO> GetServiceById(int Id)
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

        return new ServiceWithProductsWorksDTO { Service = services.First(), Products = servicesModel.First().Products, Works = servicesModel.First().Works};
    }

    public async Task<List<ServiceWithProductsWorksDTO>> GetServiceByShopId(int ShopId)
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

        var res = new List<ServiceWithProductsWorksDTO>();

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

            res.Add(new ServiceWithProductsWorksDTO { Works = service.Works, Products = service.Products, Service = servicesList.Where(n => n.Id == service.Id).First() });
        });
        
        return res;
    }

    public async Task<List<ServiceWork>> GetWorksByMaster(Guid? userId, DateTime Start, DateTime Finish)
    {
        var services = _context.Services.Where(n => n.Status == "Ended").Where(n => n.Enabled == true).Where(n => n.UpdatedAt > Start).Where(n => n.UpdatedAt < Finish).Select(n => n.Id);
        var works = _context.ServiceWorks.Where(n => services.Contains(n.ServiceId)).Where(n => n.Enabled == true);
        if (userId != null) works = works.Where(n => n.UserId == userId);

        return await works.ToListAsync();
    }

    public async Task<ServiceWithProductsWorksDTO> Update(UpdateServiceDTO dto)
    {
        var serviceCont = await _context.Services.FindAsync(dto.Id);

        var oldServiceProducts = await _context.ServiceProducts.Where(n => n.ServiceId == dto.Id).Select(n => new ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity }).ToListAsync();

        serviceCont.Name = dto.Name;
        serviceCont.ClientDescription = dto.ClientDescription;
        serviceCont.UserMasterDescription = dto.UserMasterDescription;
        serviceCont.UserCreatedDescription = dto.UserCreatedDescription;
        serviceCont.UserMasterId = dto.UserMasterId;
        serviceCont.ProductDiscountId = dto.ProductDiscountId;
        serviceCont.WorkDiscountId = dto.WorkDiscountId;
        serviceCont.UserUpdatedId = dto.UserId;
        serviceCont.UpdatedAt = DateTime.Now;

        serviceCont = await UpdateUsersData(serviceCont);


        var existProds = await _context.ServiceProducts.Where(n => n.ServiceId == dto.Id).ToDictionaryAsync(n=>n.Id, n=>n);
        var newProds = new List<ServiceProduct>();
        var totalProducts = new List<ServiceProduct>();

        foreach (var prod in dto.ServiceProducts)
        {
            if (existProds.ContainsKey(prod.Id))
            {
                var ent = existProds[prod.Id];

                ent.UpdatedAt = DateTime.Now;
                ent.Quantity = prod.Quantity;
                ent.Price = prod.Price;
                ent.ServiceId = dto.Id;
                ent.SerialNumber = prod.SerialNumber;
                ent.QuantityUnitId = prod.QuantityUnitId;
                ent.CatalogKey = prod.CatalogKey;
                ent.Discount = prod.Discount;
                ent.Name = prod.Name;
                ent.ProductId = prod.ProductId;
                ent.QuantityUnitName = "";
                ent.Total = ent.Price * ent.Quantity - ent.Discount;
                ent.UserId = prod.UserId;

                existProds.Remove(prod.Id);
                totalProducts.Add(ent);
            }
            else
            {
                var ent = new ServiceProduct();

                ent.UpdatedAt = DateTime.Now;
                ent.Quantity = prod.Quantity;
                ent.Price = prod.Price;
                ent.ServiceId = dto.Id;
                ent.SerialNumber = prod.SerialNumber;
                ent.QuantityUnitId = prod.QuantityUnitId;
                ent.CatalogKey = prod.CatalogKey;
                ent.Discount = prod.Discount;
                ent.Name = prod.Name;
                ent.ProductId = prod.ProductId;
                ent.QuantityUnitName = prod.QuantityUnitName;
                ent.Total = ent.Price * ent.Quantity - ent.Discount;
                ent.UserId = prod.UserId;

                newProds.Add(ent);
                totalProducts.Add(ent);
            }
        }

        _context.ServiceProducts.RemoveRange(existProds.Values);
        await _context.ServiceProducts.AddRangeAsync(newProds);


        var existWorks = await _context.ServiceWorks.Where(n => n.ServiceId == dto.Id).ToDictionaryAsync(n => n.Id, n => n);
        var newWorks = new List<ServiceWork>();
        var totalWorks = new List<ServiceWork>();

        foreach (var work in dto.ServiceWorks)
        {
            if (existWorks.ContainsKey(work.Id))
            {
                var ent = existWorks[work.Id];

                ent.ComplicationPrice = work.ComplicationPrice;
                ent.UpdatedAt = DateTime.Now;
                ent.UserId = work.UserId;
                ent.ServiceId = dto.Id;
                ent.WorkId = work.WorkId;
                ent.Quantity = work.Quantity;
                ent.Description = work.Description;
                ent.Price = work.Price;
                ent.Discount = work.Discount;
                ent.Total = ent.Price * ent.Quantity - ent.Discount + ent.ComplicationPrice;
                ent.Name = work.Name;

                existWorks.Remove(work.Id);
                totalWorks.Add(ent);
            }
            else
            {
                var ent = new ServiceWork();

                ent.ComplicationPrice = work.ComplicationPrice;
                ent.UpdatedAt = DateTime.Now;
                ent.UserId = work.UserId;
                ent.ServiceId = dto.Id;
                ent.WorkId = work.WorkId;
                ent.Quantity = work.Quantity;
                ent.Description = work.Description;
                ent.Price = work.Price;
                ent.Discount = work.Discount;
                ent.Total = ent.Price * ent.Quantity - ent.Discount + ent.ComplicationPrice;
                ent.Name = work.Name;

                newWorks.Add(ent);
                totalWorks.Add(ent);
            }
        }

        _context.ServiceWorks.RemoveRange(existWorks.Values);
        await _context.ServiceWorks.AddRangeAsync(newWorks);

        serviceCont.DiscountProduct = totalProducts.Select(n => n.Discount).Sum();
        serviceCont.TotalProduct = totalProducts.Select(n => n.Total).Sum();
        serviceCont.PriceProduct = serviceCont.TotalProduct + serviceCont.DiscountProduct;


        serviceCont.DiscountWork = totalWorks.Select(n => n.Discount).Sum();
        serviceCont.TotalWork = totalWorks.Select(n => n.Total).Sum();
        serviceCont.PriceWork = serviceCont.TotalWork + serviceCont.DiscountWork;

        serviceCont.Total = serviceCont.TotalWork + serviceCont.TotalProduct;
        serviceCont.Discount = serviceCont.DiscountProduct + serviceCont.DiscountWork;
        serviceCont.Price = serviceCont.Total + serviceCont.Discount;

        
        await UpdateReservation(oldServiceProducts, totalProducts, await _shopClient.GetStorageId(serviceCont.ShopId));

        await _context.SaveChangesAsync(new CancellationToken());

        return new ServiceWithProductsWorksDTO { Service = serviceCont, Products = totalProducts, Works = totalWorks };
    }

    public async Task<ServiceWithProductsWorksDTO> UpdateStatus(string status, int id)
    {
        if (!Enum.IsDefined(typeof(Status), status)) throw ServiceErrors.StatusNotFound;
        if (status == Status.Ended.ToString()) throw ServiceErrors.UnsupportedActionForStatus;

        var service = await _context.Services.FindAsync(id);
        service.Status = status;
        await _context.SaveChangesAsync(new CancellationToken());

        return await GetServiceById(id);
    }

    private async Task UpdateReservation(List<ProductQuantitySmplDTO> OldProducts, List<ServiceProduct> NewProducts, int storageId)
    {
        var data = new UpdateReservationProductsDTO();
        data.OldReservationProducts = OldProducts;
        data.NewReservationProducts = NewProducts.Select(n => new ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity }).ToList();
        await _productsClient.UpdateReservationProducts(data, storageId);
    }

    public async Task<ServiceWithProductsWorksDTO> EndService(ServiceEndDTO dto)
    {
        var service = await _context.Services.FindAsync(dto.ServiceId);
        if (service == null) throw ServiceErrors.ServiceNotFound;
        if (service.Status != Status.Ready.ToString()) throw ServiceErrors.UnsupportedActionForStatus;

        service.Status = Status.Ended.ToString();
        service.UpdatedAt = DateTime.Now;
        var storageId = await _shopClient.GetStorageId(service.ShopId);
        var oldServiceProducts = await _context.ServiceProducts.Where(n => n.ServiceId == dto.ServiceId).Select(n => new ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity }).ToListAsync();
        await UpdateReservation(oldServiceProducts, new List<ServiceProduct>(), storageId);
        await _productsClient.AddProductsToStorage(oldServiceProducts.Select(n => new ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity * -1 }).ToList(), storageId, "Service", dto.ServiceId);

        var payment = new CreatePayment { Payment = dto.Payment, ClientId = service.ClientId, ShopId = service.ShopId, Source = "Shop", Target = "Workshop", TargetId = service.Id, UserId = dto.UserId };
        await _paymentsClient.NewPayment(payment);
        await _context.SaveChangesAsync(new CancellationToken());

        var r = await GetServiceById(dto.ServiceId);
        return r;
    }
}
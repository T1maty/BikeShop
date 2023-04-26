﻿using BikeShop.Service.Application.DTO;
using BikeShop.Service.Domain.DTO.Response;
using BikeShop.Service.WebApi.Models.Service;

namespace BikeShop.Service.Application.Interfaces;

public interface IServiceService
{
    public Task<GetServiceDTO> CreateService(CreateServiceModel model);
    public Task<List<GetServiceDTO>> GetServiceByShopId(int ShopId);
    public Task<ServiceWithProductsWorksDTO> Update(UpdateServiceDTO dto);
    public Task<GetServiceDTO> GetServiceById(int Id);

    public Task UpdateStatus(string status, int id);
}
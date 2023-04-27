using BikeShop.Service.Application.DTO;
using BikeShop.Service.Domain.DTO.Response;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.Service;

namespace BikeShop.Service.Application.Interfaces;

public interface IServiceService
{
    public Task<ServiceWithProductsWorksDTO> CreateService(CreateServiceModel model);
    public Task<List<ServiceWithProductsWorksDTO>> GetServiceByShopId(int ShopId);
    public Task<ServiceWithProductsWorksDTO> Update(UpdateServiceDTO dto);
    public Task<ServiceWithProductsWorksDTO> GetServiceById(int Id);
    public Task<ServiceWithProductsWorksDTO> UpdateStatus(string status, int id);

    public Task<List<ServiceWork>> GetWorksByMaster(Guid userId);
    public Task<List<ServiceProduct>> GetProductsByMaster(Guid userId);
}
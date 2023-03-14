using BikeShop.Service.Application.DTO;
using BikeShop.Service.WebApi.Models.Service;

namespace BikeShop.Service.Application.Interfaces;

public interface IServiceService
{
    public Task<GetServiceDTO> CreateService(CreateServiceModel model, int storageId);
    public Task<List<GetServiceDTO>> GetServiceByShopId(int ShopId);
    public Task Update(UpdateServiceDTO dto, int storageId);
    public Task<GetServiceDTO> GetServiceById(int Id);

    public Task UpdateStatus(string status, int id);
}
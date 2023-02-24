using BikeShop.Service.Application.DTO;
using BikeShop.Service.WebApi.Models.Service;

namespace BikeShop.Service.Application.Interfaces;

public interface IServiceService
{
    public Task<GetServiceDTO> CreateService(CreateServiceModel model, CancellationToken cancellationToken);
    public Task<List<GetServiceDTO>> GetServiceByShopId(int ShopId);
    public Task Update(UpdateServiceDTO dto);
    public Task<GetServiceDTO> GetServiceById(int Id);
}
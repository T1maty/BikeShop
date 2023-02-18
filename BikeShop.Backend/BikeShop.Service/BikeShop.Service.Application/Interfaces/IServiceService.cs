using BikeShop.Service.WebApi.Models.Service;

namespace BikeShop.Service.Application.Interfaces;

public interface IServiceService
{
    public Task<CreateServiceDTO> CreateService(CreateServiceModel model, CancellationToken cancellationToken);
}
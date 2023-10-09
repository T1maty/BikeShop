using BikeShop.Shop.Application.DTO;
using BikeShop.Shop.Domain.DTO.Public;

namespace BikeShop.Shop.Application.Interfaces;

public interface IGetAllServices
{
    public Task<List<ShopDTO>> GetAllShops();
    public Task<bool> Login(LoginDTO dto);

    public Task<int> GetStorageId(int ShopId);
    public Task<Domain.Entities.Shop> GetById(int ShopId);
    public Task<List<ShopPublicDTO>> GetPublic();

}
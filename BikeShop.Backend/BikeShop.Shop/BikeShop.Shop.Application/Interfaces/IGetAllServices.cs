using BikeShop.Shop.Application.DTO;

namespace BikeShop.Shop.Application.Interfaces;

public interface IGetAllServices
{
    public Task<List<ShopDTO>> GetAllShops();
    public Task<bool> Login(LoginDTO dto);
}
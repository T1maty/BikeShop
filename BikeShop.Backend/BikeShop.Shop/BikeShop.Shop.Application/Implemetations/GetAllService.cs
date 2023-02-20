using AutoMapper;
using AutoMapper.QueryableExtensions;
using BikeShop.Shop.Application.DTO;
using BikeShop.Shop.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Shop.Application.Services;

public class GetAllService : IGetAllServices
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAllService(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ShopDTO>> GetAllShops()
    {
        var dto = await _context.Shops.ProjectTo<ShopDTO>(_mapper.ConfigurationProvider).ToListAsync();
        
        return dto;
    }

    public async Task<bool> Login(LoginDTO dto)
    {
        var shop = await _context.Shops.FindAsync(dto.ShopId);
        if (shop.Secret == dto.Secret)
        {

            return true;
        }
        else
        {
            return false;
        }
        
    }
}
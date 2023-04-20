using AutoMapper;
using AutoMapper.QueryableExtensions;
using BikeShop.Shop.Application.DTO;
using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Application.ReficClients;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Shop.Application.Services;

public class GetAllService : IGetAllServices
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityClient _identityClient;

    public GetAllService(IApplicationDbContext context, IMapper mapper, IIdentityClient identityClient)
    {
        _context = context;
        _mapper = mapper;
        _identityClient = identityClient;
    }

    public async Task<List<ShopDTO>> GetAllShops()
    {
        var dto = await _context.Shops.ProjectTo<ShopDTO>(_mapper.ConfigurationProvider).ToListAsync();
        
        return dto;
    }

    public async Task<Domain.Entities.Shop> GetById(int ShopId)
    {
        return await _context.Shops.FindAsync(ShopId);
    }

    public async Task<int> GetStorageId(int ShopId)
    {
        var ent = await _context.Shops.FindAsync(ShopId);
        if (ent == null)
            return 0;
        else
        return ent.StorageId;
    }

    public async Task<bool> Login(LoginDTO dto)
    {
        var shop = await _context.Shops.FindAsync(dto.ShopId);
        if (shop.Secret == dto.Secret)
        {
            await _identityClient.ChangeShop(dto.UserId, dto.ShopId);
            return true;
        }
        else
        {
            return false;
        }
        
    }
}
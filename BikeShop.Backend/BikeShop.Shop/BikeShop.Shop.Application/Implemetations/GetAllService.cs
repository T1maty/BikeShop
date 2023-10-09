using AutoMapper;
using AutoMapper.QueryableExtensions;
using BikeShop.Shop.Application.DTO;
using BikeShop.Shop.Application.Interfaces;
using BikeShop.Shop.Application.ReficClients;
using BikeShop.Shop.Domain.DTO.Public;
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

    public async Task<List<ShopPublicDTO>> GetPublic()
    {
        return await _context.Shops.Where(n => n.PublicVisible == true).Select(n=>new ShopPublicDTO{ GeoData = n.GeoData, Id = n.Id, Address = n.Address, Name = n.Name, Phone = n.Phone, StorageId = n.StorageId }).ToListAsync();
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
using AutoMapper;
using BikeShop.Shop.Application.DTO;
using BikeShop.Shop.Application.Interfaces;

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

    public async Task<List<Domain.Entities.Shop>> GetAllShops()
    {
        var dto = _context.Shops.ToList();


        return dto;
    }
}
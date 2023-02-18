using AutoMapper;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.WebApi.Models.Service;

namespace BikeShop.Service.Application.Services;

public class ServiceService : IServiceService
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ServiceService(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CreateServiceDTO> CreateService(CreateServiceModel model, CancellationToken cancellationToken)
    {
        var service = _mapper.Map<CreateServiceDTO>(model);
        _context.Services.Add(service);
        await _context.SaveChangesAsync(cancellationToken);

        return service;
    }
}
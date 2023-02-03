using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.Interfaces;
using MediatR;

namespace BikeShop.Service.Application.CQRS.Queries.Service.GetServiceById;

public class GetServiceByIdQueryHandler : IRequestHandler<GetServiceByIdQuery, Domain.Entities.Service>
{
    private readonly IApplicationDbContext _context;

    public GetServiceByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Domain.Entities.Service> Handle(GetServiceByIdQuery request, CancellationToken cancellationToken)
    {
        // Ищу сервис по айди
        var service = await _context.Services.FindAsync(request.ServiceId, cancellationToken);

        // Если нет такого - исключение
        if (service is null)
            throw new NotFoundException($"Get service by id error. Service with id {request.ServiceId} not found")
            {
                Error = "service_not_found",
                ErrorDescription = "Get service by id error. Service with given id not found"
            };

        // Если есть - возвращаю
        return service;
    }
}
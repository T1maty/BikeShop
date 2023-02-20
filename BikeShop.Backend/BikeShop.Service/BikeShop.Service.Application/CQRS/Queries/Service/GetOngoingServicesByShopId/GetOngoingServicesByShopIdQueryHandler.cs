using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Application.CQRS.Queries.Service.GetOngoingServicesByShopId;

public class
    GetOngoingServicesByShopIdQueryHandler : IRequestHandler<GetOngoingServicesByShopIdQuery, OngoingServicesModel>
{
    private readonly IApplicationDbContext _context;

    public GetOngoingServicesByShopIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<OngoingServicesModel> Handle(GetOngoingServicesByShopIdQuery request,
        CancellationToken cancellationToken)
    {
        // Получаю все services по айди магазина, и со статусом НЕ готов и НЕ удален
        var ongoingServices = await _context.Services
            .Where(s => s.ShopId == request.ShopId &&
                        s.Status != Status.Ready.ToString() &&
                        s.Status != Status.Deleted.ToString())
            .ToListAsync(cancellationToken);

        // Возвращаю их моделью
        return new OngoingServicesModel
        {
            Services = ongoingServices
        };
    }
}
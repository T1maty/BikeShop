using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.Interfaces;
using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.Service.UpdateService;

public class UpdateServiceCommandHandler : IRequestHandler<UpdateServiceCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateServiceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateServiceCommand request, CancellationToken cancellationToken)
    {
        var service = await _context.Services.FindAsync(request.Id, cancellationToken);

        if (service is null)
            throw new NotFoundException($"Service update error. Service with id {request.Id} not found")
            {
                Error = "service_not_found",
                ErrorDescription = "Service update error. Service with given id not found"
            };
        
        service.UpdatedAt = DateTime.Now;
        service.Name = request.Name;
        service.ClientDescription = request.ClientDescription;
        service.UserCreatedDescription = request.UserCreatedDescription;
        service.UserMasterDescription = request.UserMasterDescription;
        service.UserMasterId = request.UserMasterId;
        service.ShopId = request.ShopId;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
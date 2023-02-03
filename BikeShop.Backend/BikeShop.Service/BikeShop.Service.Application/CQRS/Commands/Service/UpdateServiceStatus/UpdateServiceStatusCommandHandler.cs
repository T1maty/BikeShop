using BikeShop.Service.Application.Common.Exceptions;
using BikeShop.Service.Application.Interfaces;
using MediatR;

namespace BikeShop.Service.Application.CQRS.Commands.Service.UpdateServiceStatus;

public class UpdateServiceStatusCommandHandler : IRequestHandler<UpdateServiceStatusCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateServiceStatusCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateServiceStatusCommand request, CancellationToken cancellationToken)
    {
        // Получаю сервис по указанному айди
        var service = await _context.Services.FindAsync(request.ServiceId, cancellationToken);

        // Если нет сервиса с таким айди - исключение
        if (service is null)
            throw new NotFoundException($"Update service status error. Service with id {request.ServiceId} not found")
            {
                Error = "service_not_found",
                ErrorDescription = $"Update service status error. Service with given id not found"
            };

        // Обновляю ему статус и время последнего обновления
        service.Status = request.NewStatus;
        service.UpdatedAt = DateTime.Now;

        // Сохраняю в бд
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

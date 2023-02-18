using BikeShop.Shop.Application.Exception;
using BikeShop.Shop.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Shop.Application.CQRS.Commands.UpdateShop;

public class UpdateShopCommandHandler : IRequestHandler<UpdateShopCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateShopCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateShopCommand request, CancellationToken cancellationToken)
    {
        var existingShop = await _context.Shops.FindAsync(request.Id, cancellationToken);

        if (existingShop is null)
            throw new NotFoundException("Update shop error. No shop with given id")
            {
                Error = "shop_not_found",
                ErrorDescription = "Update shop error. Shop with given id not found"
            };
        
        var existingStorageShop = await _context.Shops
            .FirstOrDefaultAsync(s => s.StorageId == request.StorageId, cancellationToken);

        if (existingStorageShop is not null)
            throw new AlreadyExistsException("Create shop error. Not unique storage id")
            {
                Error = "shop_storage_id_already_exists",
                ErrorDescription = "Create shop error. Shop with given storage id already exists"
            };
        
        existingShop.Name = request.Name;
        existingShop.Address = request.Address;
        existingShop.Phone = request.Phone;
        existingShop.Secret = request.Secret;
        existingShop.StorageId = request.StorageId;
        existingShop.CashboxCash = request.CashboxCash;
        existingShop.CashboxTerminal = request.CashboxTerminal;
        existingShop.Enabled = request.Enabled;
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}
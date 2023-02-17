using BikeShop.Shop.Application.Exception;
using BikeShop.Shop.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Shop.Application.CQRS.Commands.CreateShop;

public class CreateShopCommandHandler : IRequestHandler<CreateShopCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateShopCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateShopCommand request, CancellationToken cancellationToken)
    {
        var existingStorageShop = await _context.Shops
            .FirstOrDefaultAsync(s => s.StorageId == request.StorageId, cancellationToken);

        if (existingStorageShop is not null)
            throw new AlreadyExistsException("Create shop error. Not unique storage id")
            {
                Error = "shop_storage_id_already_exists",
                ErrorDescription = "Create shop error. Shop with given storage id already exists"
            };

        var shop = new Domain.Entities.Shop()
        {
            Name = request.Name,
            Address = request.Address,
            Phone = request.Phone,
            Secret = request.Secret,
            StorageId = request.StorageId
        };

        _context.Shops.Add(shop);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
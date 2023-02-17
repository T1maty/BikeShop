using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.CQRS.Commands.Product.UpdateProduct;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        // Ищу продукт по айди в базе
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == request.Id,
                cancellationToken);

        // Если нет продукта с таким айди - exception
        if (product is null)
            throw new NotFoundException($"Update product error. Product with id {request.Id} not found")
            {
                Error = "product_not_found",
                ErrorDescription = "Update product error. Product with given id not found",
                ReasonField = "id"
            };

        // Проверяю есть ли бренд с таким айди  
        var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Id == request.BrandId, cancellationToken);

        if (brand is null)
            throw new NotFoundException($"Update product error. Brand with id {request.Id} not found")
            {
                Error = "brand_not_found",
                ErrorDescription = "Update product error. Brand with given id not found",
                ReasonField = "id"
            };

        // Если все ок - обновляю
        product.Name = request.Name;
        product.Category = request.Category;
        product.BrandId = request.BrandId;
        product.CatalogKey = request.CatalogKey;
        product.CheckStatus = request.CheckStatus;
        product.DealerPrice = request.DealerPrice;
        product.IncomePrice = request.IncomePrice;
        product.ManufacturerBarcode = request.ManufacturerBarcode;
        product.RetailPrice = request.RetailPrice;
        product.RetailVisibility = request.RetailVisibility;
        product.B2BVisibility = request.B2BVisibility;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
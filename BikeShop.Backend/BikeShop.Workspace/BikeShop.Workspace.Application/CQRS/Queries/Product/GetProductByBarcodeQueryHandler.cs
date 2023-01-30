using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Queries.Product;

public class GetProductByBarcodeQueryHandler : IRequestHandler<GetProductByBarcodeQuery, Domain.Entities.Product>
{
    private readonly IApplicationDbContext _context;

    public GetProductByBarcodeQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Domain.Entities.Product> Handle(GetProductByBarcodeQuery request,
        CancellationToken cancellationToken)
    {
        // Ищу продукт с указанным баркодом (обычным и мануф)
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Barcode == request.Barcode ||
                                 p.ManufacturerBarcode == request.Barcode, 
                cancellationToken);

        // Если нет продукта с таким баркодом - ошибка
        if (product is null)
            throw new NotFoundException($"Get product by barcode error. Product with barcode {request.Barcode} not found")
            {
                Error = "product_not_found",
                ErrorDescription = "Get product by barcode error. Product with given barcode not found"
            };

        // Если есть - возвращаю
        return product;
    }
}
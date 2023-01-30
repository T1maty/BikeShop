using BikeShop.Workspace.Application.Common.Exceptions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Commands.Product.CreateProduct;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        // Если был передан баркод производителя - то проверка есть ли уже такой баркод
        if (request.ManufacturerBarcode is not null)
        {
            // Ищу продукт с таким же баркодом производителя
            var existingManufacturerBarcodeProduct =
                await _context.Products.FirstOrDefaultAsync(
                    product => product.ManufacturerBarcode == request.ManufacturerBarcode,
                    cancellationToken);

            // Если есть - ошибка
            if (existingManufacturerBarcodeProduct is not null)
                throw new AlreadyExistsException(
                    $"Product with manufacturer barcode {request.ManufacturerBarcode} already exists")
                {
                    Error = "product_already_exists",
                    ErrorDescription = "Product with given manufacturer barcode already exists"
                };
        }

        // Если нету бредна с указанным айди
        var existingBrand = _context.Brands.FirstOrDefaultAsync(b => b.Id == request.BrandId, cancellationToken);
        if (existingBrand is null)
            throw new NotFoundException($"Create product error. Brand with id {request.BrandId} not found")
            {
                Error = "brand_not_found",
                ErrorDescription = "Create product error. Brand with given id not found"
            };


        // Если все ок - добавляю продукт
        var newProduct = new Domain.Entities.Product
        {
            BrandId = request.BrandId,
            ManufacturerBarcode = request.ManufacturerBarcode,
            Category = request.Category,
            Name = request.Name,
            CatalogKey = request.CatalogKey,
            CheckStatus = request.CheckStatus,
            IncomePrice = request.IncomePrice,
            RetailPrice = request.RetailPrice,
            RetailVisibility = request.RetailVisibility,
            DealerPrice = request.DealerPrice,
            B2BVisibility = request.B2BVisibility
        };
        _context.Products.Add(newProduct);
        await _context.SaveChangesAsync(cancellationToken);


        // Гененирую уникальный баркод для продукта
        var barcodes = await _context.Products.Select(p => p.Barcode).ToArrayAsync(cancellationToken);
        var newBarcode = GenerateUniqueBarcode(newProduct.Id, barcodes);
        newProduct.Barcode = newBarcode;


        // // В бинде продукта к тэгам создаю записи, привязываю продукт ко всем тэгам
        foreach (var id in request.TagsIds)
        {
            _context.TagToProductBinds.Add(new TagToProductBind
            {
                ProductId = newProduct.Id,
                ProductTagId = id
            });
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    private static string GenerateUniqueBarcode(int productId, string[] existBarcodes)
    {
        var temp = productId.ToString();
        while (temp.Length < 12) temp += '0';

        var sum = 0;

        for (var i = temp.Length; i >= 1; i--)
        {
            var digit = Convert.ToInt32(temp.Substring(i - 1, 1));
            if (i % 2 == 0) sum += digit * 3;
            else sum += digit * 1;
        }

        var checkSum = (10 - sum % 10) % 10;

        var barcode = temp + checkSum;

        var counter = 0;
        while (existBarcodes.Contains(barcode))
        {
            counter++;
            var lenght = counter.ToString().Length;
            temp = barcode.Remove(12 - lenght, lenght + 1) + counter;

            var sum1 = 0;

            for (var i = temp.Length; i >= 1; i--)
            {
                var digit = Convert.ToInt32(temp.Substring(i - 1, 1));
                if (i % 2 == 0) sum1 += digit * 3;
                else sum1 += digit * 1;
            }

            var checkSum1 = (10 - (sum1 % 10)) % 10;

            barcode = temp + checkSum1;
        }

        return barcode;
    }
}
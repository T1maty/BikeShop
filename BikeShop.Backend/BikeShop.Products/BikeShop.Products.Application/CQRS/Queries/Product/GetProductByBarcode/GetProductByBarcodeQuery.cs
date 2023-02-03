using MediatR;

namespace BikeShop.Products.Application.CQRS.Queries.Product.GetProductByBarcode;

public class GetProductByBarcodeQuery : IRequest<Domain.Entities.Product>
{
    public string Barcode { get; set; } = string.Empty;
}
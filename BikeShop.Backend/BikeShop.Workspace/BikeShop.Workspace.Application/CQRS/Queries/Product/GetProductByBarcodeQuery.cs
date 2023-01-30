using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Queries.Product;

public class GetProductByBarcodeQuery : IRequest<Domain.Entities.Product>
{
    public string Barcode { get; set; } = string.Empty;
}
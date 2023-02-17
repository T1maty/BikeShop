using MediatR;

namespace BikeShop.Products.Application.CQRS.Commands.Product.CreateProduct;

public class CreateProductCommand : IRequest<Domain.Entities.Product>
{
    public string Name { get; set; } = string.Empty;
    public string CatalogKey { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? ManufacturerBarcode { get; set; }

    public decimal IncomePrice { get; set; }
    public decimal DealerPrice { get; set; }
    public decimal RetailPrice { get; set; }

    public int BrandId { get; set; }

    public string CheckStatus { get; set; } = string.Empty;
    public bool RetailVisibility { get; set; }
    public bool B2BVisibility { get; set; }

    public int[] TagsIds { get; set; }
}
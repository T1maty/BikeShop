using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;
using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.Product.UpdateProduct;

public class UpdateProductCommand : IRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string CatalogKey { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string ManufacturerBarcode { get; set; } = string.Empty;

    public decimal IncomePrice { get; set; }
    public decimal DealerPrice { get; set; } 
    public decimal RetailPrice { get; set; }

    public int BrandId { get; set; } 

    public string CheckStatus { get; set; } = string.Empty;
    public bool RetailVisibility { get; set; }
    public bool B2BVisibility { get; set; }
}
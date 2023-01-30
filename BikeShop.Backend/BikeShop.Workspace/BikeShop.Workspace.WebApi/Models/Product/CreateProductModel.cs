using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.CQRS.Commands.Product.CreateProduct;

namespace BikeShop.Workspace.WebApi.Models.Product
{
    public class CreateProductModel : IMappable
    {
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string CatalogKey { get; set; } = string.Empty;
        [Required] public string Category { get; set; } = string.Empty;
        public string? ManufacturerBarcode { get; set; } = null;

        [Required] public decimal IncomePrice { get; set; }
        [Required] public decimal DealerPrice { get; set; }
        [Required] public decimal RetailPrice { get; set; }

        public int BrandId { get; set; }

        public string CheckStatus { get; set; } = string.Empty;
        public bool RetailVisibility { get; set; }
        public bool B2BVisibility { get; set; }

        [Required] public int[] TagsIds { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateProductModel, CreateProductCommand>();
        }
    }
}
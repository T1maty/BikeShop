using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Products.Application.Common.Mappings;

namespace BikeShop.Products.WebApi.Models.Product
{
    public class CreateProductModel
    {
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string CatalogKey { get; set; } = string.Empty;
        [Required] public string Category { get; set; } = string.Empty;
        public string? ManufacturerBarcode { get; set; } = null;

        [Required] public decimal IncomePrice { get; set; }
        [Required] public decimal DealerPrice { get; set; }
        [Required] public decimal RetailPrice { get; set; }

        [Required] public int BrandId { get; set; }

        public string CheckStatus { get; set; } = string.Empty;
        public bool RetailVisibility { get; set; }
        public bool B2BVisibility { get; set; }

        [Required] public int[] TagsIds { get; set; }
    }
}
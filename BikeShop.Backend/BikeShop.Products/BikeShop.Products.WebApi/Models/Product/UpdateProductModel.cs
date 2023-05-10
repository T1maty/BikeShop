using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Products.Application.Common.Mappings;

namespace BikeShop.Products.WebApi.Models.Product
{
    public class UpdateProductModel
    { 
        [Required] public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string CatalogKey { get; set; } = string.Empty;
        [Required] public string Category { get; set; } = string.Empty;
        [Required] public string ManufacturerBarcode { get; set; } = string.Empty;

        [Required] public decimal IncomePrice { get; set; } = 0;
        [Required] public decimal DealerPrice { get; set; } = 0;
        [Required] public decimal RetailPrice { get; set; } = 0;

        [Required] public int BrandId { get; set; } = 0;

        [Required] public string CheckStatus { get; set; } = string.Empty;
        [Required] public bool RetailVisibility { get; set; } = false;
        [Required] public bool B2BVisibility { get; set; }

    }
}
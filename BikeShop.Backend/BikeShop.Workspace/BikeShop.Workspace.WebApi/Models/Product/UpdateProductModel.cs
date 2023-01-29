using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;

namespace BikeShop.Workspace.WebApi.Models.Product
{
    public class UpdateProductModel : IMappable
    {
        [Required] public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CatalogKey { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Barcode { get; set; } = string.Empty;

        public decimal IncomePrice { get; set; } = 0;
        public decimal DealerPrice { get; set; } = 0;
        public decimal RetailPrice { get; set; } = 0;

        public int BrandId { get; set; } = 0;

        public string CheckStatus { get; set; } = string.Empty;
        public bool CheckVisibility { get; set; } = false;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateProductModel, Domain.Entities.Product>();
        }
    }
}
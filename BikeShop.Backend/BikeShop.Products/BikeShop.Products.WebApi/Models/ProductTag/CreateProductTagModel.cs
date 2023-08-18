using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Products.Application.Common.Mappings;

namespace BikeShop.Products.WebApi.Models.ProductTag
{
    public class CreateProductTagModel
    {
        [Required] public string Name { get; set; } = string.Empty;
        public int ParentId { get; set; } = 0;
        public bool IsCollapsed { get; set; } = false;
        public bool IsRetailVisible { get; set; } = false;
        public bool IsB2BVisible { get; set; } = false;
        public bool IsUniversal { get; set; } = false;
        public int SortOrder { get; set; }
    }
}
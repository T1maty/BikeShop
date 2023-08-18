using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Products.Application.Common.Mappings;

namespace BikeShop.Products.WebApi.Models.ProductTag
{
    public class UpdateProductTagModel
    {
        [Required] public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public int ParentId { get; set; } = 0;
        [Required] public bool IsCollapsed { get; set; }
        [Required] public bool IsRetailVisible { get; set; }
        [Required] public bool IsB2BVisible { get; set; }
        [Required] public bool IsUniversal { get; set; }
        [Required] public int SortOrder { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Products.Application.Common.Mappings;
using BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag;

namespace BikeShop.Products.WebApi.Models.ProductTag
{
    public class CreateProductTagModel : IMappable
    {
        [Required] public string Name { get; set; } = string.Empty;
        public int ParentId { get; set; } = 0;
        public bool IsCollapsed { get; set; } = false;
        public bool IsRetailVisible { get; set; } = false;
        public bool IsB2BVisible { get; set; } = false;
        public bool IsUniversal { get; set; } = false;
        public int SortOrder { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateProductTagModel, CreateTagCommand>();
        }
    }
}
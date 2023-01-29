using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;

namespace BikeShop.Workspace.WebApi.Models.ProductTag
{
    public class UpdateProductTagModel : IMappable
    {
        [Required] public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int ParentId { get; set; } = 0;
        public bool IsCollapsed { get; set; }
        public bool IsRetailVisible { get; set; }
        public bool IsB2BVisible { get; set; }
        public bool IsUniversal { get; set; }
        public int SortOrder { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateProductTagModel, Domain.Entities.ProductTag>();
        }
    }
}
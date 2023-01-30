using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;

namespace BikeShop.Workspace.WebApi.Models.ProductTag
{
    public class CreateProductTagModel : IMappable
    {
        public string Name { get; set; } = string.Empty;
        public int ParentId { get; set; } = 0;
        public bool IsCollapsed { get; set; } = false;
        public bool IsRetailVisible { get; set; } = false;
        public bool IsB2BVisible { get; set; } = false;
        public bool IsUniversal { get; set; } = false;
        public int SortOrder { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreateProductTagModel, Domain.Entities.ProductTag>();
        }
    }
}
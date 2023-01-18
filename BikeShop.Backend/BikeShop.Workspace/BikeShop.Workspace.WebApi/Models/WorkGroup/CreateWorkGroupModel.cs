using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.CreateWorkGroup;

namespace BikeShop.Workspace.WebApi.Models.WorkGroup;

public class CreateWorkGroupModel : IMappable
{
    [Required] public string Name { get; set; }
    public int ParentId { get; set; } = 0;
    [Required] public int ShopId { get; set; }
    public bool IsCollapsed { get; set; } = false;


    public void Mapping(Profile profile)
    {
        profile.CreateMap<CreateWorkGroupModel, CreateWorkGroupCommand>();
    }
}
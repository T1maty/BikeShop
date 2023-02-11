using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateService;

namespace BikeShop.Service.WebApi.Models.Service;

public class UpdateServiceModel : IMappable
{
    [Required] public int Id { get; set; }
    [Required] public string Name { get; set; }

    [Required] public string ClientDescription { get; set; }
    [Required] public string UserMasterDescription { get; set; }
    [Required] public string UserCreatedDescription { get; set; }

    [Required] public int ShopId { get; set; }
    [Required] public Guid UserMasterId { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<UpdateServiceModel, UpdateServiceCommand>();
    }
}
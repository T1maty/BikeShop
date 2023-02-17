using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Shop.Application.CQRS.Commands.CreateShop;
using BikeShop.Shop.Application.Mappings;

namespace BikeShop.Shop.WebApi.Models;

public class CreateShopModel : IMappable
{
    [Required] public string Name { get; set; }
    [Required] public string Address { get; set; }
    [Required] public string Phone { get; set; }
    [Required] public string Secret { get; set; }
    [Required] public int StorageId { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<CreateShopModel, CreateShopCommand>();
    }
}
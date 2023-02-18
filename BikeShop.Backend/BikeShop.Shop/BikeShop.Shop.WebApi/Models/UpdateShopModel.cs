using System.ComponentModel.DataAnnotations;
using AutoMapper;
using BikeShop.Shop.Application.CQRS.Commands.UpdateShop;
using BikeShop.Shop.Application.Mappings;

namespace BikeShop.Shop.WebApi.Models;

public class UpdateShopModel : IMappable
{
    [Required]public int Id { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string Address { get; set; }
    [Required] public string Phone { get; set; }
    [Required] public bool Enabled { get; set; }
    [Required] public string Secret { get; set; }
    [Required] public int StorageId { get; set; }   
    [Required] public decimal CashboxCash { get; set; }
    [Required] public decimal CashboxTerminal { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<UpdateShopModel, UpdateShopCommand>();
    }
}
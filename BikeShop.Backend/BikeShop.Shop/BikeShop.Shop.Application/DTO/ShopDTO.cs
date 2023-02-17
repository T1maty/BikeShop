using AutoMapper;
using BikeShop.Shop.Application.CQRS.Commands.UpdateShop;
using BikeShop.Shop.Application.Mappings;

namespace BikeShop.Shop.Application.DTO;

public class ShopDTO : IMappable
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Secret { get; set; }
    public int StorageId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool Enabled { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.Shop, ShopDTO>();
    }
}
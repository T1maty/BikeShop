using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Application.DTO;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.Domain.RefitDTO;

namespace BikeShop.Service.WebApi.Models.Service;

public class CreateServiceModel : IMappable
{
    public string Name { get; set; }
    public int ShopId { get; set; }
    public Guid ClientId { get; set; } 
    public string ClientDescription { get; set; }
    public Guid UserId { get; set; }
    public Guid UserMasterId { get; set; }
    public int WorkDiscountId { get; set; } = 0;
    public int ProductDiscountId { get; set; } = 0;

    public List<ServiceProductDTO>? ServiceProducts { get; set; }
    public List<ServiceWorkDTO>? ServiceWorks { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<CreateServiceModel, Domain.Entities.Service>();
    }


}
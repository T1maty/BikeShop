using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Application.CQRS.Commands.Service.UpdateService;

namespace BikeShop.Service.WebApi.Models.Service;

public class CreateServiceModel
{
    public string Name { get; set; }
    public int ShopId { get; set; }
    public Guid ClientId { get; set; } 
    public string ClientDescription { get; set; }
    public Guid UserCreatedId { get; set; }
    public Guid UserMasterId { get; set; }
    public int WorkDiscountId { get; set; } = 0;
    public int ProductDiscountId { get; set; } = 0;
    
}
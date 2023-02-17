using AutoMapper;
using BikeShop.Identity.Application.Common.Mappings;
using BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;

namespace BikeShop.Identity.WebApi.Models.User;

public class GetUserByPhoneOrFioModel : IMappable
{
    public string? FIO { get; set; } = string.Empty;
    public string? Phone { get; set; } = string.Empty;
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<GetUserByPhoneOrFioModel, GetUsersByPhoneOrFIOQuery>();
    }
}
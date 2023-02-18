using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Domain.Enums;

namespace BikeShop.Service.WebApi.Models.Service;

public class CreateServiceDTO : Domain.Entities.Service ,IMappable
{
    public void Mapping(Profile profile)
    {
        profile.CreateMap<CreateServiceModel,CreateServiceDTO>();
    }
}
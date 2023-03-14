using AutoMapper;

namespace BikeShop.Service.Application.Common.Mappings;

public interface IMappable
{
    void Mapping(Profile profile);
}
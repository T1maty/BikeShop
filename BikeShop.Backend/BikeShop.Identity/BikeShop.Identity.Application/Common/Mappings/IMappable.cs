using AutoMapper;

namespace BikeShop.Identity.Application.Common.Mappings;

public interface IMappable
{
    void Mapping(Profile profile);
}
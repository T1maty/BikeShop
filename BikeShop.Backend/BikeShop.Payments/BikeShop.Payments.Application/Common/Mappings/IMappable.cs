using AutoMapper;

namespace BikeShop.Products.Application.Common.Mappings;

// Интерфейс создан для автомаппинга, каждый DTO/модель наследуется от этого интерфейса.
// Метод ApplyMappingsFromAssembly из AssemblyMappingProfile
// с помощью рефлексии находит все классы, что наследуют этот интерфейс и вызывает в них метод Mapping
// в котором идёт создание профиля маппинга
public interface IMappable
{
    void Mapping(Profile profile);
}
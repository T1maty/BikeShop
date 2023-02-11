using System.Reflection;
using AutoMapper;

namespace BikeShop.Products.Application.Common.Mappings;

// Класс, реализовывающий автоматическую настройку профилей маппинга.
// Сам вызывает инициализацую всех профилей маппинга, которые прописаны в моделях/дто
public class AssemblyMappingProfile : Profile
{
    public AssemblyMappingProfile(Assembly assembly)
        => ApplyMappingsFromAssembly(assembly);
    
    // Метод вызывающийся в мейне. Применяет профили маппинга для каждого типа, наследующего интерфейс IMappable
    private void ApplyMappingsFromAssembly(Assembly assembly)
    {
        // Получаю все типы, наследующие интерфейс IMappable
        var mappableTypes = assembly.GetExportedTypes()
            .Where(type => type.GetInterfaces()
                .Any(i => i == typeof(IMappable)))
            .ToList();

        // Прохожу по всем типам, наследующие IMappable
        foreach (var mappableType in mappableTypes)
        {
            // Локально создаю сущность типа наследника
            var instance = Activator.CreateInstance(mappableType);

            // Достаю метод Mapping из типа с реализацией профилей маппинга
            var method = mappableType.GetMethod("Mapping");
            
            // Вызываю метод маппинг у сущности текущего типа и передаю туда этот AssemblyMappingProfile
            method?.Invoke(instance, new object?[] { this });
        }
    }
}
using System.Text.Json.Serialization;

namespace BikeShop.Workspace.Domain.Entities;

// Услуга
public class Work : BaseEntity
{
    // Название услуги
    public string Name { get; set; } = string.Empty;

    // Описание услуги
    public string Description { get; set; } = string.Empty;

    // Цена
    public double Price { get; set; }

    // Группа работ, к которой принадлежит эта услуга
    public int WorkGroupId { get; set; }
    [JsonIgnore] public WorkGroup WorkGroup { get; set; }

    // Валюта, за которую будет проходить операция
    public int CurrencyId { get; set; }
    [JsonIgnore] public Currency Currency { get; set; }
}
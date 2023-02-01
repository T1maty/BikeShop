using System.Text.Json.Serialization;

namespace BikeShop.Service.Domain.Entities;

// Услуга
public class Work : BaseEntity
{
    // Название услуги
    public string Name { get; set; } = string.Empty;

    // Описание услуги
    public string Description { get; set; } = string.Empty;

    // Цена
    public double Price { get; set; }
    
    // Валюта, за которую будет проходить операция
    // Перемещено в Payments микросервис
    public int CurrencyId { get; set; }
    
    // Группа работ, к которой принадлежит эта услуга
    public int WorkGroupId { get; set; }
    [JsonIgnore] public WorkGroup WorkGroup { get; set; }

}
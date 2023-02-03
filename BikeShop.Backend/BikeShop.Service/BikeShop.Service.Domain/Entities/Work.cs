using System.Text.Json.Serialization;

namespace BikeShop.Service.Domain.Entities;

// Услуга
public class Work : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Название услуги
    public string Description { get; set; } = string.Empty; // Описание услуги
    public double Price { get; set; } // Цена

    public int WorkGroupId { get; set; } // Группа работ, к которой принадлежит эта услуга
    [JsonIgnore] public WorkGroup WorkGroup { get; set; }
}
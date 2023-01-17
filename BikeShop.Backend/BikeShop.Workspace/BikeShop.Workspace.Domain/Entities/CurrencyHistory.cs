using System.Text.Json.Serialization;

namespace BikeShop.Workspace.Domain.Entities;

// История изменений валюты
public class CurrencyHistory : BaseEntity
{
    public int CurrencyId { get; set; }
    [JsonIgnore] public Currency Currency { get; set; }
}